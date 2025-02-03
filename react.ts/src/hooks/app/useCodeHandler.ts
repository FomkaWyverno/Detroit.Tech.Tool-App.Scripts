import { ChangeEvent, useState, useContext, useCallback } from "react";
import { LocKeyByCodeContext } from "../../context/LocKeyByCodeContext";
import { LocSheetKeysContext } from "../../context/LocSheetKeysContext";
import { LocalizationKey } from "../../models/localization/LocalizationKey";
import { LocalizationSheetKey } from "../../models/localization/LocalizationSheetKey";


/**
 * Хук `useCodeHandler` обробляє введення коду та знаходить відповідні локалізаційні ключі.
 * 
 * @returns Об'єкт із властивостями:
 * - `containerId`: Ідентифікатор контейнера (або `null`, якщо не знайдено).
 * - `locKey`: Ключ локалізації (або `null`, якщо не знайдено).
 * - `text`: Текст локалізації (або `null`, якщо не знайдено).
 * - `hasInSheet`: Чи є цей ключ у таблиці локалізацій.
 * - `locationKey`: Локаційний ключ у форматі A1 (або `null`, якщо не знайдено).
 * - `codeOnChange`: Функція обробки введеного значення, яка шукає відповідний локалізаційний ключ.
 */
function useCodeHandler(): {
    containerId: string | null,
    locKey: string | null,
    text: string | null,
    hasInSheet: boolean,
    locationKey: string | null,
    codeOnChange: (e: ChangeEvent<HTMLInputElement>) => void
} {
    // Локальні стани для збереження даних про локалізаційний ключ
    const [containerId, setContainerId] = useState<string | null>(null);
    const [locKey, setLocKey] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);
    const [hasInSheet, setHasInSheet] = useState<boolean>(false)
    const [locationKey, setLocationKey] = useState<string | null>(null);

    // Контексти для отримання даних про ключі локалізації
    const { locKeyByCode } = useContext(LocKeyByCodeContext);
    const { locSheetKeysByIdKey } = useContext(LocSheetKeysContext);

    // Функція обробки введеного значення (коду)
    const codeOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase(); // Перетворюємо введене значення у верхній регістр
        if (locKeyByCode.has(value)) {
            const localizationKey: LocalizationKey = locKeyByCode.get(value)!;
            
            // Оновлюємо стан на основі знайденого ключа
            setContainerId(localizationKey.containerId.toString());
            setLocKey(localizationKey.key);
            setText(localizationKey.text);
            setHasInSheet(locSheetKeysByIdKey.has(localizationKey.getUniquiKey()));
            if (locSheetKeysByIdKey.has(localizationKey.getUniquiKey())) {
                const locSheetKey: LocalizationSheetKey | undefined = locSheetKeysByIdKey.get(localizationKey.getUniquiKey());
                if (locSheetKey) {
                    setLocationKey(locSheetKey.locationKey.toA1Notation());
                    console.log(locSheetKey);
                }
            } else {
                setLocationKey(null);
            }
        } else {
            // Якщо ключ не знайдено, скидаємо всі значення
            setContainerId(null);
            setLocKey(null);
            setText(null);
            setLocationKey(null);
            setHasInSheet(false);
        }
    }, [locKeyByCode, locSheetKeysByIdKey]);

    return {
        containerId,
        locKey,
        text,
        hasInSheet,
        locationKey,
        codeOnChange
    };
}

export default useCodeHandler;