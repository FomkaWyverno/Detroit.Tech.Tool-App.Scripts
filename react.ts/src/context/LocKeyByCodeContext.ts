import React from "react";
import { LocalizationKey } from "../models/localization/LocalizationKey";

export type ILocKeyByCodeContext = {
    locKeyByCode: Map<string, LocalizationKey>
}

export const LocKeyByCodeContext = React.createContext<ILocKeyByCodeContext>({locKeyByCode: new Map()});