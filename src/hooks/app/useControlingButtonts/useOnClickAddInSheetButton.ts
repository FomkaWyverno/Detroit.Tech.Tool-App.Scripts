import React, { useCallback, useContext } from "react";
import { LocalizationKey } from "../../../models/localization/LocalizationKey";
import { LocalizationSheetKey } from "../../../models/localization/LocalizationSheetKey";
import SoundManager from "../../../utils/SoundManager";
import { AppScripts } from "../../../services/app-scripts/AppScripts";
import { Range } from "../../../models/sheet/Range";
import { ValuesInputsState } from "../../../components/InputsContainer/InputsContainerReducer";
import { AddedLocalizationSheetKey } from "../../../types/localization/localization";
import { LocSheetKeysContext } from "../../../context/LocSheetKeysContext";
import { ActorNamesContext } from "../../../context/ActorNamesContex";
import { ActorNamesAction } from "../../../context/ActorNamesContextProvider";

class ValidationException extends Error {
    constructor(message: string) {
        super(message);
    }
}

interface AddInSheetOptions {
    localizationKey: LocalizationKey | null, // Поточний ключ локалізації
    localizationKeySheet: LocalizationSheetKey | null, // Ключ, який вже присутній в таблиці
    inputValues: ValuesInputsState, // Вхідні значення (контекст, таймінг, ім'я актора)
    isVisiblyMessage: boolean, // Статус видимості спливаючого повідомлення
    setMessagePopup: (message: string) => void, // Функція для встановлення спливаючого повідомлення
    setVisiblyMessage: (isVisiblyMessage: boolean) => void // Функція для зміни видимості спиваючого повідомлення
}

/**
 * Хук для обробки натискання кнопки додавання локалізаційного ключа до таблиці.
 * Виконує валідацію, додає ключ в таблицю, оновлює контексти для аркушів та акторів,
 * а також відтворює звуки при успіху або помилці.
 * 
 * @param {AddInSheetOptions} params - Об'єкт параметрів.
 * @returns {Object} Функція onClickAddInSheetButton для додавання ключа.
 */
function useOnClickAddInSheetButton({
    localizationKey,
    localizationKeySheet,
    inputValues,
    isVisiblyMessage,
    setMessagePopup,
    setVisiblyMessage
}: AddInSheetOptions): {
    onClickAddInSheetButton: () => void, // Повертає функцію для додавання ключа в аркуш
} {
    const { dispatchLocSheetKeys } = useContext(LocSheetKeysContext); // Отримуємо dispatch для оновлення контексту аркушів
    const { actorNamesByVoiceKey, dispatchActorNames } = useContext(ActorNamesContext); // Отримуємо dispatch для оновлення глосарію акторів

    const onClickAddInSheetButton = useCallback(async () => {
        try {
            console.log(localizationKey); // Логування для перевірки ключа
            validationInputData(localizationKeySheet, localizationKey, inputValues); // Валідація вхідних даних
            const validatedLocalizationKey = localizationKey!; // Підтвердження існування ключа
            const addedKey = await addKeyToSheet(validatedLocalizationKey, inputValues); // Додавання ключа до таблиці

            // Оновлюємо контекст мапи ключів у аркушів
            updateSheetKeysContext(addedKey, validatedLocalizationKey, inputValues, dispatchLocSheetKeys);

            // Якщо у аркуші є колонка для акторів, оновлюємо контекст глосарію акторів
            if (addedKey.hasActorColumn) { // Якщо у аркуші є колонка для Акторів
                // Оновлюмоє контекст глосарію імен акторів
                updateActorNamesContext(validatedLocalizationKey, actorNamesByVoiceKey, inputValues, dispatchActorNames);
            }

            // Відтворення звуку успіху
            SoundManager.playPop(0.3);
        } catch (e) {
            console.error(e); // Логування помилки
            handleError(e, isVisiblyMessage, setMessagePopup, setVisiblyMessage); // Обробка помилки
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        actorNamesByVoiceKey,
        inputValues,
        isVisiblyMessage,
        localizationKey,
        localizationKeySheet,
    ]);

    return { onClickAddInSheetButton }
}

export default useOnClickAddInSheetButton;


/**
 * Оновлює контекст локалізаційних ключів в аркушах, додаючи новий ключ.
 * 
 * @param {AddedLocalizationSheetKey} addedKey - Ключ, що додається.
 * @param {LocalizationKey} localizationKey - Локалізаційний ключ.
 * @param {ValuesInputsState} inputValues - Вхідні значення (контекст, таймінг, ім'я актора).
 * @param {React.Dispatch} dispatchLocSheetKeys - Функція для оновлення контексту локалізаційних ключів.
 */
function updateSheetKeysContext(addedKey: AddedLocalizationSheetKey, localizationKey: LocalizationKey, inputValues: ValuesInputsState, dispatchLocSheetKeys: React.Dispatch<import("d:/MyProgram/Сайты/DetroitTechTool-AppScripts.github.io/src/context/LocSheetKeysContextProvider").LocSheetKeysAction>) {
    // Оновлення контексту аркушів новим ключем
    const range: Range = new Range(addedKey.sheetName, addedKey.indexRow, addedKey.indexColumn, addedKey.numRows, addedKey.numColumns);
    const newLocSheetKey: LocalizationSheetKey = new LocalizationSheetKey(
        range,
        localizationKey.containerId,
        localizationKey.key,
        addedKey.hasActorColumn ? inputValues.actorValue : undefined);

    // Оновлюємо Контекст локалізаційних ключів у аркушах
    dispatchLocSheetKeys({ type: "ADD_LOCALIZATION_KEY_SHEET", payload: newLocSheetKey });
}

/**
 * Оновлює контекст глосарію акторів, додаючи нове ім'я актора для голосового коду.
 * 
 * @param {LocalizationKey} localizatinKey - Локалізаційний ключ.
 * @param {Map<string, string[]>} actorNamesByVoiceKey - Глосарій акторів за голосовим кодом.
 * @param {ValuesInputsState} inputValues - Вхідні значення (контекст, таймінг, ім'я актора).
 * @param {React.Dispatch} dispatchActorNames - Функція для оновлення глосарію акторів.
 */
function updateActorNamesContext(
    localizatinKey: LocalizationKey,
    actorNamesByVoiceKey: Map<string, string[]>,
    inputValues: ValuesInputsState,
    dispatchActorNames: React.Dispatch<ActorNamesAction>): void {
    // Додаємо ім'я актора до глосарію, якщо його там немає

    const voiceCode = localizatinKey.voiceCode; // Дістаємо голосовий ключ з поточного локалізайного ключа
    if (!voiceCode) throw new Error('Був доданий ключ локалізації до аркуша, але ключ має некоретний голосовий код, щоб зберегти його в словнику імен!');

    // Якщо все гаразд з голосовим кодом
    if (!actorNamesByVoiceKey.has(voiceCode) || !actorNamesByVoiceKey.get(voiceCode)?.includes(inputValues.actorValue)) { // Якщо голосового коду не існує в глосарію, або такого імені немає за цим кодом
        dispatchActorNames({ type: "ADD_ACTOR_NAME", payload: { voiceCode, actorName: inputValues.actorValue } }); // Додаємо за цим голосовим кодом, нове імя актора
    }

}

/**
 * Виконує валідацію вхідних даних перед додаванням локалізаційного ключа.
 * Перевіряє наявність ключа в таблиці, локалізаційного ключа та контексту.
 * 
 * @param {LocalizationSheetKey | null} localizationKeySheet - Ключ, який вже є в таблиці.
 * @param {LocalizationKey | null} localizationKey - Поточний локалізаційний ключ.
 * @param {ValuesInputsState} inputValues - Вхідні значення.
 * @throws {Error} Викидає помилку, якщо дані некоректні.
 */
function validationInputData(localizationKeySheet: LocalizationSheetKey | null, localizationKey: LocalizationKey | null, inputValues: ValuesInputsState): void {
    if (localizationKeySheet) { // Якщо ключ в таблиці вже присутній
        SoundManager.playKeyInSheet(0.1);
        throw new ValidationException('Локалізаційний ключ вже присутній в таблиці!');
    }
    if (!localizationKey) { // Якщо поточний ключ локалізації не існує.
        SoundManager.playKeyNoExists(0.1);
        throw new ValidationException('Не можна додати не існуючий локалізаційний ключ.');
    }
    // Перевірка наявності значення контексту
    if (!inputValues.contextValue) throw new Error('Поле контексту порожнє!');
}

/**
 * Додає локалізаційний ключ до аркуша.
 * 
 * @param {LocalizationKey} localizatinKey - Локалізаційний ключ.
 * @param {ValuesInputsState} inputValues - Вхідні значення.
 * @returns {Promise<AddedLocalizationSheetKey>} Ключ, що був доданий в таблицю.
 */
async function addKeyToSheet(localizatinKey: LocalizationKey, inputValues: ValuesInputsState): Promise<AddedLocalizationSheetKey> {
    // Додавання нового ключа до таблиці за допомогою AppScripts
    const appScripts = await AppScripts.getInstance();

    const successKey: AddedLocalizationSheetKey = await appScripts.scripts.addLocalizationKey( // Додаємо ключ у аркуш
        localizatinKey.containerId,
        localizatinKey.key,
        localizatinKey.text,
        localizatinKey.fragments.prefixes,
        localizatinKey.fragments.texts,
        localizatinKey.fragments.suffix,
        inputValues.contextValue,
        inputValues.timingValue,
        inputValues.actorValue);

    return successKey;
}

/**
 * Обробляє помилки та відображає повідомлення, якщо виникає помилка.
 * 
 * @param {unknown} error - Помилка, що сталася.
 * @param {boolean} isVisiblyMessage - Статус видимості повідомлення.
 * @param {Function} setMessagePopup - Функція для встановлення повідомлення.
 * @param {Function} setVisiblyMessage - Функція для зміни видимості повідомлення.
 */
function handleError(error: unknown, isVisiblyMessage: boolean, setMessagePopup: (message: string) => void, setVisiblyMessage: (isVisiblyMessage: boolean) => void): void {
    // Обробка помилок
    if (!(error instanceof ValidationException)) SoundManager.playError2(0.05);
    if (isVisiblyMessage) return;
    setMessagePopup(String(error));
    setVisiblyMessage(true)
    setTimeout(() => {
        setVisiblyMessage(false);
    }, 3000);
}