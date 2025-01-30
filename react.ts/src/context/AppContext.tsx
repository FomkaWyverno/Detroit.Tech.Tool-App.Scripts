import React from "react";
import { LocalizationKeyText } from "../models/localization/LocalizationKeyText";

interface IAppContext {
    mapLocKeyByCode: Map<string, LocalizationKeyText>
}

export const AppContext = React.createContext<IAppContext | null>(null);