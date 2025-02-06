import { useCallback } from "react"
import SoundManager from "../../../utils/SoundManager";
import { LocalizationSheetKey } from "../../../models/localization/LocalizationSheetKey";
import { Range } from "../../../models/sheet/Range";
import { AppScripts } from "../../../services/app-scripts/AppScripts";


function useOnClickSearchButton(
    locKeySheetModel: LocalizationSheetKey | null,
    isVisiblyMessage: boolean,
    setMessagePopup: (message: string) => void,
    setVisiblyMessage: (isVisiblyMessage: boolean) => void
): { 
    onClickSearchButton: () => void
} {
    const onClickSearchButton = useCallback(async () => {
        try {
            if (!locKeySheetModel) {
                SoundManager.playError2(0.05);
                throw new Error('Неможливо знайти ключ локалізації у таблиці, так як він не існує!');
            }
        
            const range: Range = locKeySheetModel.locationKey;

            const sheetName: string = range.sheetName;
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
            if (isVisiblyMessage) return;
            const error = e as Error;
            setMessagePopup(error.message);
            setVisiblyMessage(true);
            setTimeout(() => {
                setVisiblyMessage(false);
            }, 3000);
        }
    }, [isVisiblyMessage, locKeySheetModel, setMessagePopup, setVisiblyMessage]);
    return {
        onClickSearchButton
    }
}

export default useOnClickSearchButton;