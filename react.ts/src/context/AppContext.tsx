import React from "react";

interface IAppContext {
}

export const AppContext = React.createContext<IAppContext>({} as IAppContext);