import { LocalizationKeyText } from './../../models/localization/LocalizationKeyText';
import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { LocalizationData } from "../../types/localization/localization";
import { groupLocKeyTextByCode, mapLocalizationToKeyText } from '../../utils/LocalizationUtil';

const localizationDataURL = 'https://raw.githubusercontent.com/FomkaWyverno/Detroit.Tech.Tool-App.Scripts.github.io/refs/heads/react.js/Detroit_LocalizationRegistry.json';

const enum STATE {
    DEFAULT = 'Етап-1: Завантаження ключів локалізації...',
    PROCCESSING_LOC_DATA = 'Етап-1: Оброблюємо локалізаційні ключі!',
    ERROR = "Сталась помилка! 😩"
}

function useAppInit(): [
    isInitializeApp: boolean,
    state: string,
    error: string,
    mapLocKeyByCode: Map<string, LocalizationKeyText>
] {
    const [isInitializeApp, setInitializeApp] = useState<boolean>(false);
    const [state, setState] = useState<string>(STATE.DEFAULT);
    const [error_msg, setErrorMsg] = useState<string>('');

    const [mapLocKeyByCode, setMapLocKeyByCode] = useState<Map<string, LocalizationKeyText>>(new Map());
    const [locData, loading, error] = useFetch<LocalizationData>(localizationDataURL);

    useEffect(() => {
        if (error) {
            setState(STATE.ERROR);
            setErrorMsg(error);
        } else if (locData && !loading) {
            setState(STATE.PROCCESSING_LOC_DATA);
            setMapLocKeyByCode(groupKeysByCode(locData));
        }
    },[error, loading, locData]);

    return [isInitializeApp, state, error_msg, mapLocKeyByCode];
}

export default useAppInit;

function groupKeysByCode(locData: LocalizationData): Map<string, LocalizationKeyText> {
    const keys: Array<LocalizationKeyText> = mapLocalizationToKeyText(locData);
    const groupMap: Map<string, LocalizationKeyText> = groupLocKeyTextByCode(keys)

    return groupMap;
}