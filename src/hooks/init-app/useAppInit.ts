import { LocSheetKeysContext } from './../../context/LocSheetKeysContext';
import { LocalizationKey } from '../../models/localization/LocalizationKey';
import { useCallback, useContext, useEffect, useState } from "react";
import useFetch from "../useFetch";
import { LocalizationData } from "../../types/localization/localization";
import { groupByVoiceCode, groupLocKeyTextByCode, groupLocSheetKeyByContainerIdAndKey, mapLocalizationToKeyText } from '../../utils/LocalizationUtil';
import { AppScripts } from '../../services/app-scripts/AppScripts';
import { Sheet } from '../../models/sheet/Sheet';
import { parseSheetToLocalizationSheetKeys } from '../../utils/SheetUtil';
import { LocalizationSheetKey } from '../../models/localization/LocalizationSheetKey';
import { delay } from '../../utils/Utils';
import { PromiseUtils } from '../../utils/PromiseUtils';
import { ActorNamesContext } from '../../context/ActorNamesContex';

const localizationDataURL = 'https://raw.githubusercontent.com/FomkaWyverno/Detroit.Tech.Tool-App.Scripts/refs/heads/master/Detroit_LocalizationRegistry.json';

const enum STATE {
    DEFAULT = 'Етап-1: Завантаження ключів локалізації... ⏳',
    PROCCESSING_LOC_DATA = 'Етап-1: Оброблюємо локалізаційні ключі! 🔄',
    APP_SCRIPTS_INIT = 'Етап-2: Ініцілізації з App-Scripts ⚙️',
    APP_SCRIPTS_SHEETS_NAMES = 'Етап-2: Отримуємо назви аркушів. 📑',
    APP_SCRIPTS_SHEET_GET_VALUES = 'Етап-2: Читаємо аркуші 🔍:',
    PROCESS_KEYS = 'Етап-3: Опрацьовуємо отриману інформацію 🧩🛠️',
    ERROR = "Сталась помилка! 😩🚨"
}

/**
 * Кастомний хук для ініціалізації застосунку.
 * Виконує завантаження локалізаційних ключів, ініціалізує App Scripts
 *
 * @returns {[boolean, string, string, number, Map<string, LocalizationKey>]} 
 * Масив зі станом ініціалізації, статусом, повідомленням про помилку, прогресом і мапою локалізаційних ключів.
 */
function useAppInit(): [
    isInitializeApp: boolean,
    state: string,
    error: string,
    progress: number,
    locKeyByCode: Map<string, LocalizationKey>,
] {
    const [isInitializeApp, setInitializeApp] = useState<boolean>(false);
    const [state, setState] = useState<string>(STATE.DEFAULT);
    const [error_msg, setErrorMsg] = useState<string>('');
    const [progress, setProgress] = useState<number>(-1);

    // Сховище для локалізаційних ключів
    const [locData, loading, errorFetch] = useFetch<LocalizationData>(localizationDataURL);

    // Оброблені данні таблиці та завантажена локалізація
    const [locKeysByCode, setLocKeysByCode] = useState<Map<string, LocalizationKey>>(new Map()) // Мапа яка має ключ це код, а значення це локалізаційний ключ, з оригінульного файлу
    const { dispatchActorNames } = useContext(ActorNamesContext);  // Контекст який керує Мапою яка має ключ це голосовий ключ, а значення це массив імен для цього ключа, з таблиці
    const { dispatchLocSheetKeys } = useContext(LocSheetKeysContext);

    useEffect(() => {
        if (errorFetch) {
            setState(STATE.ERROR);
            setErrorMsg(errorFetch);
        }
    }, [errorFetch]);

    const appInit = useCallback(async () => {
        try { // Виклик функції відбувається, лише тоді коли locData не null тому, ми впевнені, що тут все гаразд буде.
            setState(STATE.PROCCESSING_LOC_DATA);
            const keysGroup = groupKeysByCode(locData!);
            setLocKeysByCode(keysGroup);

            setState(STATE.APP_SCRIPTS_INIT);
            // Отримання екземпляра AppScripts
            const appScripts = await AppScripts.getInstance();
            const sheets: Array<Sheet> = await processSheets(appScripts, setState, setProgress); // Оброблюємо таблицю

            setState(STATE.PROCESS_KEYS); // Оброблюємо дані з таблиці

            const keys: LocalizationSheetKey[] = sheets.flatMap(sheet => parseSheetToLocalizationSheetKeys(sheet)); // Парсимо дані в моделі ключів локалізації
            dispatchLocSheetKeys({ type: "INIT_LOCALIZATION_KEYS_SHEET", payload: groupLocSheetKeyByContainerIdAndKey(keys) }); // Ініцілізуємо всі ключа в таблиці
            const group = groupByVoiceCode(keys);
            console.log(group);
            dispatchActorNames({ type: "INIT_ACTOR_NAMES", payload: group }); // Ініцілізуємо імена акторів

            setInitializeApp(true);
        } catch (e) {
            console.error('Сталася помилка!!!');
            console.error(e);
            setState(STATE.ERROR);
            setErrorMsg(e instanceof Error ? e.message : String(e));
        }
    }, [dispatchActorNames, dispatchLocSheetKeys, locData]);

    useEffect(() => {
        if (!loading && locData && !isInitializeApp) appInit();

    }, [loading, locData, isInitializeApp, appInit]);

    return [isInitializeApp, state, error_msg, progress, locKeysByCode];
}

export default useAppInit;

/**
 * Групує локалізаційні ключі за кодом.
 * 
 * @param {LocalizationData} locData Об'єкт з даними локалізації.
 * @returns {Map<string, LocalizationKey>} Мапа локалізаційних ключів, згрупованих за кодами.
 */
function groupKeysByCode(locData: LocalizationData): Map<string, LocalizationKey> {
    return groupLocKeyTextByCode(mapLocalizationToKeyText(locData));
}

async function processSheets(
    appScripts: AppScripts,
    setState: (state: string) => void,
    setProgress: (progress: number) => void
): Promise<Array<Sheet>> {
    setState(STATE.APP_SCRIPTS_SHEETS_NAMES);

    // Отримання назв аркушів
    const sheetsNames: string[] = await appScripts.scripts.getSheetNames();
    console.log(sheetsNames);

    setProgress(0);
    const total = sheetsNames.length;
    let completed = 0;

    const processSheet = async (sheetName: string, signal: AbortSignal): Promise<Sheet> => {
        if (signal.aborted) return null!; // Якщо виникла помилка не починаємо виконувати завдання
        signal.addEventListener('abort', () => {
            console.warn(`Aborted task for ${sheetName}`);
        });

        const sheetValue: string[][] = await appScripts.scripts.getValueSheet(sheetName); // Отримуємо значення з таблиці з AppScripts

        if (signal.aborted) return null!; // Перевірка на скасування після отримання значень
        completed++; // Збільшуємо кількість лічильник аркушів з яких отримано вміст

        if (signal.aborted) return null!; // Перевірка перед оновленням стану
        setState(`${STATE.APP_SCRIPTS_SHEET_GET_VALUES} ${completed} з ${total}`); // Встановлюємо стан, для сповіщення користувача, скільки вже опрацьовано аркушів
        
        if (signal.aborted) return null!; // Перевірка перед оновленням прогресу
        setProgress(completed / total); // Встановлюємо новий прогресс
        if (!sheetValue) throw new Error(`Аркуш: "${sheetName}" немає вмісту! (Один з варіантів вирішення. Обрати всі значення Ctrl+A -> Формат -> Число -> Звичайний текст)`); // Якщо значення не прийшо, сповіщуємо про помилку
        return new Sheet(sheetName, sheetValue); // Повертаємо Аркуш.
    }

    const sheets: Sheet[] = await PromiseUtils.allWithLimit<Sheet>(sheetsNames.map(sheetName => (signal: AbortSignal) => processSheet(sheetName, signal)), AppScripts.SIMULTANEOUS_CALLS);

    await delay(2000);
    // Обнулення прогресу після завершення процесу
    setProgress(-1)
    return sheets;
}