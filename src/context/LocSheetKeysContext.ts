import React, { createContext } from "react"
import { LocSheetKeysAction, LocSheetKeysState } from "./LocSheetKeysContextProvider";


export type ILocSheetKeysContext = LocSheetKeysState & {
    dispatchLocSheetKeys: React.Dispatch<LocSheetKeysAction>
}

const defaultContextValue: ILocSheetKeysContext = {
    locSheetKeysByIdKey: new Map(),
    dispatchLocSheetKeys: () => {
        throw new Error("dispatchLocSheetKeys called outside of LocSheetKeysContext");
    }
}

export const LocSheetKeysContext = createContext<ILocSheetKeysContext>(defaultContextValue);