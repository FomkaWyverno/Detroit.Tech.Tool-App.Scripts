import React, { useReducer } from "react";
import { ActorNamesState, ActorNamesAction, ActorNamesContext } from "./ActorNamesContex";

/**
 * Початковий стан для редюсера.
 */
function initialReducer(): ActorNamesState {
  return {
    actorNamesByVoiceKey: new Map(),
  };
}

/**
 * Редюсер для управління станом акторських даних.
 */
function reducer(state: ActorNamesState, action: ActorNamesAction) {
  switch (action.type) {
    case "INIT_ACTOR_NAMES":
      return { actorNamesByVoiceKey: action.payload };
    case "ADD_ACTOR_NAME": {
      const newMap = new Map<string, string[]>(state.actorNamesByVoiceKey);
      const payloadActors = newMap.get(action.payload.voiceCode) || [];
      if (!payloadActors.includes(action.payload.actorName)) {
        newMap.set(action.payload.voiceCode, [...payloadActors, action.payload.actorName]);
      }
      return { actorNamesByVoiceKey: newMap };
    }
    default:
      throw new Error(`Unknown action type ${action}`);
  }
}

interface IActorNamesContextProvider {
  children: React.ReactNode;
}

function ActorNamesContextProvider({ children }: IActorNamesContextProvider) {
  const [state, dispatch] = useReducer(reducer, null, initialReducer);

  return (
    <ActorNamesContext.Provider value={{ actorNamesByVoiceKey: state.actorNamesByVoiceKey, dispatchActorNames: dispatch }}>
      {children}
    </ActorNamesContext.Provider>
  );
}

export default ActorNamesContextProvider;
