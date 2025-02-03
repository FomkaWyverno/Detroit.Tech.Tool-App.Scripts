import { useCallback } from "react";
import { LocalizationSheetKey } from "../../models/localization/LocalizationSheetKey";
import { AppScripts } from "../../services/app-scripts/AppScripts";
import { Range } from "../../models/sheet/Range";
import { LocalizationKey } from "../../models/localization/LocalizationKey";
import SoundManager from "../../utils/SoundManager";


function useControlingButtons(
    localizatinKey: LocalizationKey | null,
    locKeySheetModel: LocalizationSheetKey | null
): {
    onClickAddInSheetButton: () => void
    onClickSearchButton: () => void 
} {
    const onClickAddInSheetButton = useCallback(async () => {
        console.log(localizatinKey);
        if (locKeySheetModel) {
            SoundManager.playError2(0.05);
            return;
        }
        if (!localizatinKey) {
            SoundManager.playError2(0.05);
            return;
        }
    }, [localizatinKey, locKeySheetModel]);

    const onClickSearchButton = useCallback(async () => {
        if (!locKeySheetModel) {
            SoundManager.playError2(0.05);
            return;
        }
        try {
            const range: Range = locKeySheetModel.locationKey;

            const sheetName: string = range.sheet.getSheetName();
            const indexRow: number = range.indexRow;
            const indexColumn: number = range.indexColumn;
            const numRows: number = range.numRows;
            const numColumns: number = range.numColumns;

            const appScripts: AppScripts = await AppScripts.getInstance();
            await appScripts.scripts.showRange(sheetName, indexRow, indexColumn, numRows, numColumns);

            SoundManager.playPop(0.3);
        } catch (e) {
            SoundManager.playError2(0.05);
            console.log(e);
        }
    }, [locKeySheetModel]);


    return {
        onClickAddInSheetButton,
        onClickSearchButton
    }
}

export default useControlingButtons;