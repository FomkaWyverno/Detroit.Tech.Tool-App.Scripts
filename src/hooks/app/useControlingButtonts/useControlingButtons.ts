import { LocalizationSheetKey } from "../../../models/localization/LocalizationSheetKey";
import { LocalizationKey } from "../../../models/localization/LocalizationKey";
import useOnClickSearchButton from "./useOnClickSearchButton";
import useOnClickAddInSheetButton from "./useOnClickAddInSheetButton";
import { ValuesInputsState } from "../../../components/InputsContainer/InputsContainerReducer";


/**
 * Об'єднує два кастомних хука для управління кнопками: одна для додавання локалізаційного ключа в таблицю, інша для пошуку локалізаційного ключа в таблиці.
 * 
 * @param {LocalizationKey | null} localizationKey - Локалізаційний ключ, що міститься у файлі.
 * @param {LocalizationSheetKey | null} localizationKeySheet - Локалізаційний ключ, що міститься в таблиці.
 * @param {ValuesInputsState} inputValues - Вхідні значення, що містять контекст, таймінг та ім'я актора.
 * @param {boolean} isVisiblyMessage - Статус видимості повідомлення.
 * @param {(message: string) => void} setMessagePopup - Функція для встановлення повідомлення.
 * @param {(isVisiblyMessage: boolean) => void} setVisiblyMessage - Функція для зміни видимості повідомлення.
 * 
 * @returns {{
*     onClickAddInSheetButton: () => void, 
*     onClickSearchButton: () => void
* }} Функції для обробки натискання на кнопки додавання в таблицю та пошуку в таблиці.
*/
function useControlingButtons(
    localizationKey: LocalizationKey | null, 
    localizationKeySheet: LocalizationSheetKey | null, 
    inputValues: ValuesInputsState,
    isVisiblyMessage: boolean,
    setMessagePopup: (message: string) => void,
    setVisiblyMessage: (isVisiblyMessage: boolean) => void
): {
    onClickAddInSheetButton: () => void
    onClickSearchButton: () => void

} {
    const { onClickAddInSheetButton } = useOnClickAddInSheetButton({ localizationKey, localizationKeySheet, inputValues, isVisiblyMessage, setMessagePopup, setVisiblyMessage });
    const { onClickSearchButton } = useOnClickSearchButton(localizationKeySheet, isVisiblyMessage, setMessagePopup, setVisiblyMessage);
    return {
        onClickAddInSheetButton,
        onClickSearchButton,
    }
}

export default useControlingButtons;