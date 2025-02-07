import React, { useReducer } from 'react'
import { LocSheetKeysContext } from './LocSheetKeysContext'
import { LocalizationSheetKey } from '../models/localization/LocalizationSheetKey'

export type LocSheetKeysState = {
    locSheetKeysByIdKey: Map<string, LocalizationSheetKey> // Мапа де ключ це рядок `${containerID}.${key}`, а значення це локалізаційний ключ. Як приклад ключа '2348.GUI_MENU_FLOWCHART_MESSAGE' 
}

export type LocSheetKeysAction = 
    | { type: "INIT_LOCALIZATION_KEYS_SHEET"; payload: Map<string, LocalizationSheetKey> }
    | { type: "ADD_LOCALIZATION_KEY_SHEET"; payload: LocalizationSheetKey };

const defaultReducerValue: LocSheetKeysState = {
    locSheetKeysByIdKey: new Map()
}
/**
 * Редюсер для управління станом ключів у таблиці.
 */
function reducer(state: LocSheetKeysState, action: LocSheetKeysAction): LocSheetKeysState {
    switch (action.type) {
        case 'INIT_LOCALIZATION_KEYS_SHEET': return { locSheetKeysByIdKey: action.payload }
        case 'ADD_LOCALIZATION_KEY_SHEET': {
            const newMap = new Map(state.locSheetKeysByIdKey);
            newMap.set(action.payload.getUniquiKey(), action.payload);
            return { locSheetKeysByIdKey: newMap }
        }
        default: throw new Error(`Unknown action type ${action}`);
    }
}

interface ILocSheetKeysContextProvider {
    children: React.ReactNode
}

function LocSheetKeysContextProvider({
    children
}: ILocSheetKeysContextProvider) {
    const [state, dispatch] = useReducer(reducer, defaultReducerValue);

    return (
        <LocSheetKeysContext.Provider value={{ locSheetKeysByIdKey: state.locSheetKeysByIdKey, dispatchLocSheetKeys: dispatch }}>
            {children}
        </LocSheetKeysContext.Provider>
    )
}

export default LocSheetKeysContextProvider
