import { useEffect, useState } from "react";
import { LocalizationKeyText } from "../../models/localization/LocalizationKeyText";
import { LocalizationData } from "../../types/localization/localization";
import { groupLocKeyTextByCode, mapLocalizationToKeyText } from "../../utils/LocalizationUtil";

/**
 * Хук для обробки локалізаційних даних.
 * 
 * @param {LocalizationData} localizationData - Дані локалізації.
 * @returns {Map<string, LocalizationKeyText>} - Груповані дані локалізації за кодом.
 */
function useLocalizationMap(localizationData: LocalizationData | null): Map<string, LocalizationKeyText> | null {
    const [localizationMap, setLocalizationMap] = useState<Map<string, LocalizationKeyText> | null>(null);

    useEffect(() => {
        if (localizationData) {
            const locKeys: Array<LocalizationKeyText> = mapLocalizationToKeyText(localizationData);
            const mapKeyByCode: Map<string, LocalizationKeyText> = groupLocKeyTextByCode(locKeys);
            setLocalizationMap(mapKeyByCode);
        }
    }, [localizationData]);

    return localizationMap;
}

export default useLocalizationMap;