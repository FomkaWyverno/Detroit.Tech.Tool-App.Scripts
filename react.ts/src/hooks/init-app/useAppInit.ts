import { LocalizationKeyText } from './../../models/localization/LocalizationKeyText';
import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { LocalizationData } from "../../types/localization/localization";
import { groupLocKeyTextByCode, mapLocalizationToKeyText } from '../../utils/LocalizationUtil';
import { AppScripts } from '../../services/app-scripts/AppScripts';

const localizationDataURL = 'https://raw.githubusercontent.com/FomkaWyverno/Detroit.Tech.Tool-App.Scripts.github.io/refs/heads/react.js/Detroit_LocalizationRegistry.json';

const enum STATE {
    DEFAULT = 'Етап-1: Завантаження ключів локалізації... ⏳',
    PROCCESSING_LOC_DATA = 'Етап-1: Оброблюємо локалізаційні ключі! 🔄',
    APP_SCRIPTS_INIT = 'Етап-2: Ініцілізації з App-Scripts ⚙️',
    APP_SCRIPTS_SHEETS_NAMES = 'Етап-2: Отримуємо назви аркушів. 📑',
    APP_SCRIPTS_SHEET_GET_VALUES = 'Етап-2: Читаємо аркуш 🔍:',
    ERROR = "Сталась помилка! 😩🚨"
}

/**
 * Кастомний хук для ініціалізації застосунку.
 * Виконує завантаження локалізаційних ключів, ініціалізує App Scripts
 * TODO: У розробці
 *
 * @returns {[boolean, string, string, number, Map<string, LocalizationKeyText>]} 
 * Масив зі станом ініціалізації, статусом, повідомленням про помилку, прогресом і мапою локалізаційних ключів.
 */
function useAppInit(): [
    isInitializeApp: boolean,
    state: string,
    error: string,
    progress: number,
    mapLocKeyByCode: Map<string, LocalizationKeyText>
] {
    const [isInitializeApp, setInitializeApp] = useState<boolean>(false);
    const [state, setState] = useState<string>(STATE.DEFAULT);
    const [error_msg, setErrorMsg] = useState<string>('');
    const [progress, setProgress] = useState<number>(-1);
    // Сховище для локалізаційних ключів
    const [mapLocKeyByCode, setMapLocKeyByCode] = useState<Map<string, LocalizationKeyText>>(new Map());
    const [locData, loading, error] = useFetch<LocalizationData>(localizationDataURL);

    useEffect(() => {
        if (error) {
            setState(STATE.ERROR);
            setErrorMsg(error);
            return;
        } 
        if (!locData || loading) return;


        setState(STATE.PROCCESSING_LOC_DATA);
        setMapLocKeyByCode(groupKeysByCode(locData));
        setState(STATE.APP_SCRIPTS_INIT);
        (async () => {
            try {
                // Отримання екземпляра AppScripts
                const appScripts = await AppScripts.getInstance();
                setState(STATE.APP_SCRIPTS_SHEETS_NAMES);

                // Отримання назв аркушів
                const sheets: Array<string> = await appScripts.scripts.getSheetNames();
                console.log(sheets);

                setProgress(0);
                const total = sheets.length;
                // Перебір кожного аркуша та завантаження його вмісту
                for (let i = 0; i < total; i++) {
                    const sheetName = sheets[i];
                    setState(`${STATE.APP_SCRIPTS_SHEET_GET_VALUES} "${sheetName}" ${i + 1} з ${total}`);
                    const sheetValue: string[][] = await appScripts.scripts.getValueSheet(sheetName);
                    setProgress((i + 1) / total);
                    if (!sheetValue) {
                        throw new Error(`Аркуш: "${sheetName}" немає вмісту!`)
                    }
                }
                // Обнулення прогресу після завершення процесу
                setTimeout(() => setProgress(-1), 2000);
            } catch (e) {
                console.error('Сталася помилка!!!');
                console.error(e);
                setState(STATE.ERROR);
                if (e instanceof Error) {
                    setErrorMsg(e.message);
                } else {
                    setErrorMsg(String(e));
                }
            }
        })();

    }, [error, loading, locData]);

    return [isInitializeApp, state, error_msg, progress, mapLocKeyByCode];
}

export default useAppInit;

/**
 * Групує локалізаційні ключі за кодом.
 * 
 * @param {LocalizationData} locData Об'єкт з даними локалізації.
 * @returns {Map<string, LocalizationKeyText>} Мапа локалізаційних ключів, згрупованих за кодами.
 */
function groupKeysByCode(locData: LocalizationData): Map<string, LocalizationKeyText> {
    const keys: Array<LocalizationKeyText> = mapLocalizationToKeyText(locData);
    const groupMap: Map<string, LocalizationKeyText> = groupLocKeyTextByCode(keys)

    return groupMap;
}