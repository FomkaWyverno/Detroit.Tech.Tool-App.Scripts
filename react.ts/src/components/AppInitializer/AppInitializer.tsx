import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useFetch from '../../hooks/useFetch';
import { LocalizationData } from '../../types/localization/localization';
import { resolve } from 'path';

interface IAppInitializer {
    children: React.ReactNode
}

function AppInitializer({
    children
}: IAppInitializer) {
    const [isInitialize, setInitialize] = useState<boolean>(false);
    const [state, setState] = useState<string>('Завантаження...');
    const [error_msg, setErrorMsg] = useState<string>('');
    const [data, loading, error] = useFetch<LocalizationData>('https://raw.githubusercontent.com/FomkaWyverno/Detroit.Tech.Tool-App.Scripts.github.io/refs/heads/react.js/Detroit_LocalizationRegistry.json');

    useEffect(() => {
        if (error) {
            setErrorMsg(error);
            return;
        }
        if (!loading) {
            setState('Завантажено');
        }
    },[loading, error]);
    return isInitialize
            ? children
            : <LoadingScreen state={state} error_msg={error_msg}/>
}

export default AppInitializer
