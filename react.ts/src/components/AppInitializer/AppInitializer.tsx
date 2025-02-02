import React, { useEffect } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useAppInit from '../../hooks/init-app/useAppInit';
import LocKeyByCodeContextProvider from '../../context/LocKeyByCodeContextProvider';

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
        locKeyByCode // Мапа де ключ це код, а значення це ключ локалізації
    ] = useAppInit();

    if (isInitialize) {
        return (
            <LocKeyByCodeContextProvider contextValue={{ locKeyByCode: locKeyByCode }}>
                {children}
            </LocKeyByCodeContextProvider>
        )
    } else {
        return <LoadingScreen state={state} error_msg={error} progress={progress} />
    }    
}

export default AppInitializer
