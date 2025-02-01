import { LocalizationKey } from "../models/localization/LocalizationKey";
import { LocalizationSheetKey } from "../models/localization/LocalizationSheetKey";
import { LocalizationData } from "../types/localization/localization";


const patternVoiceKey = /.+?_.+?_.+?_.+?_(.+?)_.+/;

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
 * Повертає голосовий ключ (voiceKey) із заданого ключа локалізації.
 * Очікується, що ключ має формат: `metaText_metaText_metaText_metaText_VOICE-KEY_metaText`.
 * Приклад: X0101X_TERRACE_PARTI_PC_X01CONNOR_TRUTH0101V2 - Результат: X01CONNOR
 * 
 * @param key Ключ локалізації, що містить голосовий ідентифікатор.
 * @returns Повертає голосовий ключ або `"-"`, якщо формат ключа не відповідає очікуваному.
 */
export function getVoiceKey(key: string): string | undefined {
    const matches = patternVoiceKey.exec(key);
    if (matches) return matches[1];
    return undefined;
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
export function groupByVoiceKey(keys: LocalizationSheetKey[]): Map<string, string[]> {
    return keys.filter(key => key.actorName) // Фільтруємо лише ті, що мають актора
                .reduce((map, key) => {
                    const voiceKey = getVoiceKey(key.key); // Отримуємо голосовий ключ
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