import React from 'react'
import { ILocSheetKeysContext, LocSheetKeysContext } from './LocSheetKeysContext'

interface ILocSheetKeysContextProvider {
    children: React.ReactNode
    contextValue: ILocSheetKeysContext
}

function LocSheetKeysContextProvider({
    children,
    contextValue
}: ILocSheetKeysContextProvider) {
    return (
        <LocSheetKeysContext.Provider value={contextValue}>
            {children}
        </LocSheetKeysContext.Provider>
    )
}

export default LocSheetKeysContextProvider
