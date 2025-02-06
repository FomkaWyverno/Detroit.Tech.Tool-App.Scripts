import { createContext } from "react"
import { LocalizationSheetKey } from "../models/localization/LocalizationSheetKey"


export type ILocSheetKeysContext = {
    locSheetKeysByIdKey: Map<string, LocalizationSheetKey> // Мапа де ключ це рядок `${containerID}.${key}`, а значення це локалізаційний ключ. Як приклад ключа '2348.GUI_MENU_FLOWCHART_MESSAGE' 
}

export const LocSheetKeysContext = createContext<ILocSheetKeysContext>({locSheetKeysByIdKey: new Map()});