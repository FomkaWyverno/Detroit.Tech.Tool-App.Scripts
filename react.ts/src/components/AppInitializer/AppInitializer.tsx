import React from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useAppInit from '../../hooks/init-app/useAppInit';
import LocKeyByCodeContextProvider from '../../context/LocKeyByCodeContextProvider';
import LocSheetKeysContextProvider from '../../context/LocSheetKeysContextProvider';

interface IAppInitializer {
    children: React.ReactNode
}

function AppInitializer({
    children
}: IAppInitializer) {
    const [
        isInitialize, // Чи ініцілізована програма?
        state, // Стан ініцілізації
        error, // Повідомлення про помилку
        progress, // Прогресс ініцілізації програми
        locKeyByCode, // Мапа де ключ це код, а значення це ключ локалізації
        locSheetKeysByIdKey,
    ] = useAppInit();

    if (isInitialize) {
        return (
            
            <LocSheetKeysContextProvider contextValue={{ locSheetKeysByIdKey: locSheetKeysByIdKey }}>
                <LocKeyByCodeContextProvider contextValue={{ locKeyByCode: locKeyByCode }}>
                    {children}
                </LocKeyByCodeContextProvider>
            </LocSheetKeysContextProvider>
        )
    } else {
        return <LoadingScreen state={state} error_msg={error} progress={progress} />
    }    
}

export default AppInitializer
