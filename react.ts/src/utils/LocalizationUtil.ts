import { LocalizationKeyText } from "../models/localization/LocalizationKeyText";
import { LocalizationData } from "../types/localization/localization";

/**
 * Перетворює дані локалізації в масив об'єктів типу LocalizationKeyText.
 * Кожен об'єкт містить інформацію про контейнер, ключ, текст і додаткові параметри.
 * 
 * @param {LocalizationData} localizationData - Дані локалізації, де кожен контейнер має ключі з локалізаційними текстами.
 * @returns {LocalizationKeyText[]} Масив об'єктів LocalizationKeyText, що представляють кожну локалізацію.
 */
export function mapLocalizationToKeyText(localizationData: LocalizationData): Array<LocalizationKeyText> {
    return Object.entries(localizationData)
        .map(([containerIdStr, container]) => {
            return Object.entries(container)
                .map(([keyStr, locText]) => {
                    return new LocalizationKeyText(
                        parseInt(containerIdStr),
                        keyStr,
                        locText.text,
                        locText.hasLink,
                        locText.linkExists);
            });
        }).flat();
}

/**
 * Групує об'єкти LocalizationKeyText за кодом у Map, де ключ - це код локалізації.
 * Якщо кілька об'єктів мають однаковий код, зберігається лише останній об'єкт.
 * 
 * @param {LocalizationKeyText[]} arrayLocKeyText - Масив об'єктів LocalizationKeyText, які потрібно згрупувати.
 * @returns {Map<string, LocalizationKeyText>} Map, де ключем є код, а значенням - відповідний об'єкт LocalizationKeyText.
 */
export function groupLocKeyTextByCode(arrayLocKeyText: Array<LocalizationKeyText>): Map<string, LocalizationKeyText> {
    const mapResult = new Map<string, LocalizationKeyText>();
    arrayLocKeyText.forEach((locKeyText) => {
        mapResult.set(locKeyText.code, locKeyText);
    });
    return mapResult;
}