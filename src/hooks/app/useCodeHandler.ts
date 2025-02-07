import { ChangeEvent, useState, useContext, useCallback, useEffect } from "react";
import { LocKeyByCodeContext } from "../../context/LocKeyByCodeContext";
import { LocSheetKeysContext } from "../../context/LocSheetKeysContext";
import { LocalizationKey } from "../../models/localization/LocalizationKey";
import { LocalizationSheetKey } from "../../models/localization/LocalizationSheetKey";

export type CodeHandlerState = {
    localizationKey: LocalizationKey | null,
    localizationSheetKey: LocalizationSheetKey | null
}

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
    codeHandlerState: CodeHandlerState
    codeOnChange: (e: ChangeEvent<HTMLInputElement>) => void
} {
    // Локальні стани для збереження даних про локалізаційний ключ
    const [state, setState] = useState<CodeHandlerState>({
        localizationKey: null,
        localizationSheetKey: null
    });
    const [currentCode, setCurrentCode] = useState<string>(''); // Стан для поточного код локалізації

    // Контексти для отримання даних про ключі локалізації
    const { locKeyByCode } = useContext(LocKeyByCodeContext);
    const { locSheetKeysByIdKey } = useContext(LocSheetKeysContext);

    // Функція обробки введеного значення (коду)
    const codeOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase(); // Перетворюємо введене значення у верхній регістр
        setCurrentCode(value);
        handleNewCode(locKeyByCode, locSheetKeysByIdKey, setState, value);
    }, [locKeyByCode, locSheetKeysByIdKey]);

    useEffect(() => {
        handleNewCode(locKeyByCode, locSheetKeysByIdKey, setState, currentCode);
    }, [currentCode, locKeyByCode, locSheetKeysByIdKey]);

    return {
        codeHandlerState: state,
        codeOnChange
    };
}

export default useCodeHandler;

function handleNewCode(
    locKeyByCode: Map<string, LocalizationKey>,
    locSheetKeysByIdKey: Map<string, LocalizationSheetKey>,
    setState: React.Dispatch<React.SetStateAction<CodeHandlerState>>,
    code: string
):void {
    const localizationKey: LocalizationKey | null = locKeyByCode.get(code) ?? null;
    let localizationSheetKey: LocalizationSheetKey | null = null;
    if (localizationKey) {
        localizationSheetKey = locSheetKeysByIdKey.get(localizationKey.getUniquiKey()) ?? null;
    }

    setState((prevState: CodeHandlerState) => {
        if (prevState.localizationKey === localizationKey && prevState.localizationSheetKey === localizationSheetKey) return prevState;
        return { localizationKey, localizationSheetKey };
    });
}
