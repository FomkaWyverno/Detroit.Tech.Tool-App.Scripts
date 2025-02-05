import { useCallback } from "react";
import { LocalizationKey } from "../../../models/localization/LocalizationKey";
import { LocalizationSheetKey } from "../../../models/localization/LocalizationSheetKey";
import SoundManager from "../../../utils/SoundManager";
import { AppScripts } from "../../../services/app-scripts/AppScripts";


function useOnClickAddInSheetButton(localizatinKey: LocalizationKey | null, localizatinKeySheet: LocalizationSheetKey | null): {
    onClickAddInSheetButton: () => void
} {
    const onClickAddInSheetButton = useCallback(async () => {
        console.log(localizatinKey);
        if (localizatinKeySheet) { // Якщо ключ в таблиці вже присутній
            SoundManager.playError2(0.05);
            return;
        }
        if (!localizatinKey) { // Якщо поточний ключ локалізації не існує.
            SoundManager.playError2(0.05);
            return;
        }

        try {
            const appScripts = await AppScripts.getInstance();
            
        } catch (e) {
            console.error(e);
            SoundManager.playError2(0.05);
        } 
        
    }, [localizatinKey, localizatinKeySheet]);

    return { onClickAddInSheetButton }
}

export default useOnClickAddInSheetButton;