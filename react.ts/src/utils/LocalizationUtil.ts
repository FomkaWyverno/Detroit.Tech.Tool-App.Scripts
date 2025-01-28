import { ContainerLocalization, LocalizationData, LocalizationKeyText } from "../types/localization/localization";


function mapLocalizationToKeyText(localizationData: LocalizationData): Map<string, LocalizationKeyText> {
    const mapKeyText = new Map<string, LocalizationKeyText>();

    Object.entries(localizationData).forEach(([containerIdStr, container]) => {
        Object.entries(container).forEach(([key, localizationText]) => {
            
        });
    });

    return mapKeyText;
}