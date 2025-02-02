import React from "react";

/**
 * Тип стану для зберігання акторів по голосовим ключам.
 */
export type ActorNamesState = {
  actorNamesByVoiceKey: Map<string, string[]>;
};

/**
 * Типи дій, що підтримуються редюсером для роботи з акторськими даними.
 */
export type ActorNamesAction =
  | { type: "INIT_ACTOR_NAMES"; payload: Map<string, string[]> }
  | { type: "ADD_ACTOR_NAME"; payload: { voiceCode: string; actorName: string } };

export type IActorNamesContext = ActorNamesState & {
  dispatchActorNames: React.Dispatch<ActorNamesAction>;
};

const defaultValueContext: IActorNamesContext = {
  actorNamesByVoiceKey: new Map(),
  dispatchActorNames: () => {
    throw new Error("dispatchActorNames called outside of ActorNamesContextProvider");
  },
};

export const ActorNamesContext = React.createContext<IActorNamesContext>(defaultValueContext);