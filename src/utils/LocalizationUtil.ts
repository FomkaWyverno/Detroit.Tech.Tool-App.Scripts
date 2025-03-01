import { LocalizationKey } from "../models/localization/LocalizationKey";
import { LocalizationSheetKey } from "../models/localization/LocalizationSheetKey";
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

/**
 * Групує ключі локалізації за голосовим ключем (voiceKey), відфільтровуючи ті,
 * що мають актора, і створює мапу, де ключем є voiceKey, а значенням — масив акторських імен.
 * 
 * @param keys Масив об'єктів `LocalizationSheetKey`, які містять локалізаційні ключі.
 * @returns Повертає мапу, де ключем є `voiceKey`, а значенням — масив імен для акторів.
 * 
 * Приклад:
 * 
 * Вхід:
 * [
 *   { key: "X0101X_TERRACE_PARTI_PC_X01ANDROID_TRUTH01V2", actorName: "Деніел" },
 *   { key: "X0101X_TERRACE_PARTII_PC_X01CONNOR_GIVEUPV2", actorName: "Конор" },
 *   { key: "X0101X_TERRACE_PARTII_PC_X01ANDROID_BLUFFV2", actorName: "Деніел" }
 * ]
 * 
 * Вихід:
 * new Map([
 *   ["X01ANDROID", ["Деніел"]],
 *   ["X01CONNOR", ["Конор"]]
 * ])
 */
export function groupByVoiceCode(keys: LocalizationSheetKey[]): Map<string, string[]> {
    return keys.filter(key => key.actorName) // Фільтруємо лише ті, що мають актора
                .reduce((map, key) => {
                    const voiceKey = key.voiceCode; // Отримуємо голосовий ключ
                    if (voiceKey) { // Перевіряємо, чи є дійсним voiceKey
                        // Якщо в мапі вже є такий voiceKey, додаємо ActorName
                        if (map.has(voiceKey)) {
                            if (!map.get(voiceKey)?.includes(key.actorName!)) { // Якщо вже є ключ за голосовим кодом, але немає такого імені, додаємо це.
                                map.get(voiceKey)?.push(key.actorName!);
                            }
                        } else { // Якщо такого voiceKey ще немає, створюємо новий запис
                            map.set(voiceKey, [key.actorName!])
                        }
                    }
                    return map;
                }, new Map<string, string[]>()); // Повертаємо порожню мапу як початкове значення

}

/**
 * Групуємо ключи з таблиці об'єднавши контейнер айді з ключом локалізації через крапку. Приклад - `2348.GUI_MENU_FLOWCHART_MESSAGE`
 * @param keys Ключі локалізації
 * @returns Погруповану мапу де ключ це рядок поєднання айді контейнера з ключем, а значення сам ключ локалізації у таблиці
 */
export function groupLocSheetKeyByContainerIdAndKey(keys: Array<LocalizationSheetKey>): Map<string, LocalizationSheetKey> {
    return keys.reduce((map, key) => {
        return map.set(key.getUniquiKey(), key);;
    }, new Map<string, LocalizationSheetKey>());
}