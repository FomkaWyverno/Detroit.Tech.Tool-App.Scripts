import { useReducer } from "react";

/**
 * Тип стану для зберігання акторів по голосовим ключам.
 */
type State = {
    mapActorNamesByVoiceKey: Map<string, string[]>
}

/**
 * Типи дій, що підтримуються редюсером для роботи з акторськими даними.
 */
type Action =
    | { type: "INIT_ACTOR_NAMES"; payload: Map<string, string[]>}
    | { type: "ADD_ACTOR_NAME"; payload: {voiceCode: string, actorName: string}}


/**
 * Початковий стан редюсера для акторів.
 */
const initialActorNames: State = {
    mapActorNamesByVoiceKey: new Map()
}

/**
 * Редюсер для керування акторськими даними за голосовими кодами.
 *
 * @param state Поточний стан редюсера.
 * @param action Операція, яку потрібно виконати (ініціалізація або додавання актора).
 * @returns Новий стан після виконання операції.
 */
function reducerActorNames(state: State, action: Action): State {
    switch (action.type) {
        case "INIT_ACTOR_NAMES":
            return {mapActorNamesByVoiceKey: action.payload}
        case "ADD_ACTOR_NAME": {
                const newMap = new Map<string, string[]>(state.mapActorNamesByVoiceKey);
                const payloadActors = newMap.get(action.payload.voiceCode) || [];
                if (!payloadActors.includes(action.payload.actorName)) {
                    newMap.set(action.payload.voiceCode, [...payloadActors, action.payload.actorName]);
                }
                return {mapActorNamesByVoiceKey: newMap};
            }
    }
}

/**
 * Кастомний хук для роботи з редюсером імен акторів.
 *
 * @returns Масив з двох елементів:
 * 1. Поточний стан з мапою імен акторів за кодом голосу.
 * 2. Функція діспетчера для відправки дій до редюсера.
 *
 * Використовується для керування станом імен акторів в додатку.
 */

export function useReducerActorNames(): [State, React.Dispatch<Action>] {
    return useReducer(reducerActorNames, initialActorNames);
}
