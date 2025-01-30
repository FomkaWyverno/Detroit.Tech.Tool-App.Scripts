import React, {  } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useAppInit from '../../hooks/init-app/useAppInit';
import { AppContext } from '../../context/AppContext';

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
        mapLocKeyByCode // Мапа з ключами локалізації, де ключ це код, а значення ключ локалізації відповідний до кода.
    ] = useAppInit();

    if (isInitialize) {
        return (
            <AppContext.Provider value={{mapLocKeyByCode}}>
                {children}
            </AppContext.Provider>
        );
    } else {
        return <LoadingScreen state={state} error_msg={error} progress={progress}/>
    } 
}

export default AppInitializer
