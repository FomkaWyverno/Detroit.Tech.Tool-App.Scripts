import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useFetch from '../../hooks/useFetch';
import { LocalizationData } from '../../types/localization/localization';
import { LocalizationKeyText } from '../../models/localization/LocalizationKeyText';
import useLocalizationMap from '../../hooks/init-app/useLocalizationMap';

const localizationDataURL = 'https://raw.githubusercontent.com/FomkaWyverno/Detroit.Tech.Tool-App.Scripts.github.io/refs/heads/react.js/Detroit_LocalizationRegistry.json';

interface IAppInitializer {
    children: React.ReactNode
}

function AppInitializer({
    children
}: IAppInitializer) {
    const [isInitialize, setInitialize] = useState<boolean>(false);
    const [state, setState] = useState<string>('Завантаження ключів локалізації...');
    const [error_msg, setErrorMsg] = useState<string>('');
    const [localizationData, loading_data, error] = useFetch<LocalizationData>(localizationDataURL);
    const localizationMap: Map<string, LocalizationKeyText> | null = useLocalizationMap(localizationData);

    useEffect(() => {
        if (error) {
            setState('Сталась помилка!');
            setErrorMsg(error);
        } else if (!loading_data && localizationData) {
            setState('Оброблюємо ключі локалізації!');
        }
        console.log('effect')
        console.log(localizationData)
        console.log(loading_data)
        console.log(error)
        console.log('effect');
    },[localizationData, loading_data, error]);

    useEffect(() => {
        if (localizationMap) {
            console.log(localizationMap);
        }
    }, [localizationMap]);
    return isInitialize
            ? children
            : <LoadingScreen state={state} error_msg={error_msg}/>
}

export default AppInitializer
