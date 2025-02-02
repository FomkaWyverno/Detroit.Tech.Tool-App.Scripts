import React, {  } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useAppInit from '../../hooks/init-app/useAppInit';

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
    ] = useAppInit();

    return isInitialize ? children : <LoadingScreen state={state} error_msg={error} progress={progress}/>
}

export default AppInitializer
