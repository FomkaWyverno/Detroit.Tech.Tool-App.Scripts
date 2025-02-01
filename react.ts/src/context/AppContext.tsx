import React from "react";
import { LocalizationKey } from "../models/localization/LocalizationKey";

interface IAppContext {
    mapLocKeyByCode: Map<string, LocalizationKey>
}

export const AppContext = React.createContext<IAppContext | null>(null);