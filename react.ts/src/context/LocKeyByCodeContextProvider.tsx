import React from 'react'
import { ILocKeyByCodeContext, LocKeyByCodeContext } from './LocKeyByCodeContext';


type ILocKeyByCodeContextProvider = { 
    children: React.ReactNode
    contextValue: ILocKeyByCodeContext
}

function LocKeyByCodeContextProvider({
    children,
    contextValue
}: ILocKeyByCodeContextProvider) {

    return (
        <LocKeyByCodeContext.Provider value={contextValue}>
            {children}
        </LocKeyByCodeContext.Provider>
    )
}

export default LocKeyByCodeContextProvider
