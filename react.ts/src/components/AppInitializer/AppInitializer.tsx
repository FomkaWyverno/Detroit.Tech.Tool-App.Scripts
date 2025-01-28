import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useFetch from '../../hooks/useFetch';
import { LocalizationData } from '../../types/localization/localization';

const localizationDataURL = 'https://raw.githubusercontent.com/FomkaWyverno/Detroit.Tech.Tool-App.Scripts.github.io/refs/heads/react.js/Detroit_LocalizationRegistry.json';

interface IAppInitializer {
    children: React.ReactNode
}

function AppInitializer({
    children
}: IAppInitializer) {
    const [isInitialize, setInitialize] = useState<boolean>(false);
    const [state, setState] = useState<string>('Завантаження...');
    const [error_msg, setErrorMsg] = useState<string>('');
    const [localizationData, loading, error] = useFetch<LocalizationData>(localizationDataURL);

    useEffect(() => {
        if (error) {
            setState('Сталась помилка!');
            setErrorMsg(error);
        } else if (!loading) {
            setState('Завантажено');
        }
    },[loading, error]);

    useEffect(() => {

    }, [localizationData]);
    return isInitialize
            ? children
            : <LoadingScreen state={state} error_msg={error_msg}/>
}

export default AppInitializer
