import React from "react";
import { ActorNamesAction, ActorNamesState } from "./ActorNamesContextProvider";

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