import { useCallback } from "react";
import { LocalizationKey } from "../../../models/localization/LocalizationKey";
import { LocalizationSheetKey } from "../../../models/localization/LocalizationSheetKey";
import SoundManager from "../../../utils/SoundManager";
import { AppScripts } from "../../../services/app-scripts/AppScripts";
import { ValuesInputsState } from "../../../components/InputsContainer/InputsContainerReducer";
import { AddedLocalizationSheetKey } from "../../../types/localization/localization";


function useOnClickAddInSheetButton(
    localizatinKey: LocalizationKey | null, 
    localizatinKeySheet: LocalizationSheetKey | null,
    inputValues: ValuesInputsState,
    isVisiblyMessage: boolean,
    setMessagePopup: (message: string) => void,
    setVisiblyMessage: (isVisiblyMessage: boolean) => void
): {
    onClickAddInSheetButton: () => void,
} {
    // Додати до контеста з ключами таблиці редектор, щоб можна було оновлювати динамічно ключи в таблиці

    const onClickAddInSheetButton = useCallback(async () => {
        try {
            console.log(localizatinKey);
            if (localizatinKeySheet) { // Якщо ключ в таблиці вже присутній
                SoundManager.playError2(0.05);
                throw new Error('Локалізаційний ключ вже присутній в таблиці!');
            }
            if (!localizatinKey) { // Якщо поточний ключ локалізації не існує.
                SoundManager.playError2(0.05);
                throw new Error('Не можна додати не існуючий локалізаційний ключ.');
            }

        
            validationInputValues(inputValues);

            const appScripts = await AppScripts.getInstance();
            const successKey: AddedLocalizationSheetKey = await appScripts.scripts.addLocalizationKey(localizatinKey.containerId,
                localizatinKey.key,
                localizatinKey.text,
                localizatinKey.fragments.prefixes,
                localizatinKey.fragments.texts, 
                localizatinKey.fragments.suffix,
                inputValues.contextValue,
                inputValues.timingValue,
                inputValues.actorValue);

            
            
            SoundManager.playPop(0.3);
        } catch (e) {
            console.error(e);
            SoundManager.playError2(0.05);
            if (isVisiblyMessage) return;
            setMessagePopup(String(e));
            setVisiblyMessage(true)
            setTimeout(() => {
                setVisiblyMessage(false);
            }, 3000);
        } 
        
    }, [inputValues, isVisiblyMessage, localizatinKey, localizatinKeySheet, setMessagePopup, setVisiblyMessage]);

    return { onClickAddInSheetButton }
}

export default useOnClickAddInSheetButton;


function validationInputValues(inputValues: ValuesInputsState): void {
    if (!inputValues.contextValue) throw new Error('Поле контексту порожнє!');
}