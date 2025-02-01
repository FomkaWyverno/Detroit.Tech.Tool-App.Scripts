import { useReducer } from "react";
import { LocalizationKey } from "../../models/localization/LocalizationKey";

/**
 * Тип стану для зберігання локалізаційних ключів за кодом.
 */
type State = {
    mapLocKeyByCode: Map<string, LocalizationKey>
}

/**
 * Типи дій, що підтримуються редюсером для роботи з локалізаційними даними.
 */
type Action =  { 
    type: "INIT_LOC_KEY_CODE";
    payload: Map<string, LocalizationKey>
}

/**
 * Початковий стан редюсера для локалізаційних ключів.
 */
const initialLocKeyCode: State = { mapLocKeyByCode: new Map() }


/**
 * Редюсер для керування локалізаційними ключами.
 *
 * @param state Поточний стан редюсера.
 * @param action Операція, яку потрібно виконати (ініціалізація мапи локалізацій).
 * @returns Новий стан після виконання операції.
 */
function reducerLocKeyCode(state: State, action: Action): State {
    switch (action.type) {
        case "INIT_LOC_KEY_CODE":
            return { mapLocKeyByCode: action.payload }
        default:
            throw new Error(`Unknow action type in reducerLocKeyCode. Type: ${action.type}`);
    }
}

/**
 * Кастомний хук для роботи з редюсером локалізаційних ключів.
 *
 * @returns Масив з двох елементів:
 * 1. Поточний стан з мапою локалізаційних ключів.
 * 2. Функція діспетчера для відправки дій до редюсера.
 *
 * Використовується для керування станом локалізаційних ключів в додатку.
 */
export function useReducerLocKeyCode(): [State, React.Dispatch<Action>] {
    return useReducer(reducerLocKeyCode, initialLocKeyCode);
}