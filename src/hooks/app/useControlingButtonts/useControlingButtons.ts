import { LocalizationSheetKey } from "../../../models/localization/LocalizationSheetKey";
import { LocalizationKey } from "../../../models/localization/LocalizationKey";
import useOnClickSearchButton from "./useOnClickSearchButton";
import useOnClickAddInSheetButton from "./useOnClickAddInSheetButton";
import { ValuesInputsState } from "../../../components/InputsContainer/InputsContainerReducer";


/**
 * Об'єднує два кастомних хука, для двух кнопок, для додавання в таблицю та пошуку в таблиці ключа локалізації
 * 
 * @param {(LocalizationKey | null)} localizatinKey локалізаційний ключ з файлу
 * @param {(LocalizationSheetKey | null)} locKeySheetModel локалізаційний ключ у таблиці
 * @returns {{
 *     onClickAddInSheetButton: () => void
 *     onClickSearchButton: () => void 
 * }} Два івента для натискання на кнопку додавання в таблицю ключа, та для натискання на кнопку пошуку у таблиці
 */
function useControlingButtons(
    localizatinKey: LocalizationKey | null,
    locKeySheetModel: LocalizationSheetKey | null,
    inputValues: ValuesInputsState
): {
    onClickAddInSheetButton: () => void
    onClickSearchButton: () => void 
} {
    const { onClickAddInSheetButton } = useOnClickAddInSheetButton(localizatinKey, locKeySheetModel, inputValues);
    const { onClickSearchButton } = useOnClickSearchButton(locKeySheetModel);
    return {
        onClickAddInSheetButton,
        onClickSearchButton
    }
}

export default useControlingButtons;