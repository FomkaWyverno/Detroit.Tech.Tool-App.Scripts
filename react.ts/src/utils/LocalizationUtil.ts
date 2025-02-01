import { LocalizationKey } from "../models/localization/LocalizationKey";
import { LocalizationData } from "../types/localization/localization";

/**
 * Перетворює дані локалізації в масив об'єктів типу LocalizationKeyText.
 * Кожен об'єкт містить інформацію про контейнер, ключ, текст і додаткові параметри.
 * 
 * @param {LocalizationData} localizationData - Дані локалізації, де кожен контейнер має ключі з локалізаційними текстами.
 * @returns {LocalizationKey[]} Масив об'єктів LocalizationKeyText, що представляють кожну локалізацію.
 */
export function mapLocalizationToKeyText(localizationData: LocalizationData): Array<LocalizationKey> {
    return Object.entries(localizationData)
        .map(([containerIdStr, container]) => {
            return Object.entries(container)
                .map(([keyStr, locText]) => {
                    return new LocalizationKey(
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
 * @param {LocalizationKey[]} arrayLocKeyText - Масив об'єктів LocalizationKeyText, які потрібно згрупувати.
 * @returns {Map<string, LocalizationKey>} Map, де ключем є код, а значенням - відповідний об'єкт LocalizationKeyText.
 */
export function groupLocKeyTextByCode(arrayLocKeyText: Array<LocalizationKey>): Map<string, LocalizationKey> {
    const mapResult = new Map<string, LocalizationKey>();
    arrayLocKeyText.forEach((locKeyText) => {
        mapResult.set(locKeyText.code, locKeyText);
    });
    return mapResult;
}