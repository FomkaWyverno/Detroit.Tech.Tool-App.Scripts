export interface ValuesInputsState {
    youtubeLinkValue: string,
    codeValue: string,
    contextValue: string,
    timingValue: string,
    actorValue: string
}

export type ValuesInputsAction = {
    type: "CHANGE_YOUTUBE_LINK" | "CHANGE_CODE_VALUE" | "CHANGE_CONTEXT_VALUE" | "CHANGE_TIMING_VALUE" | "CHANGE_ACTOR_VALUE",
    payload: string
}

export const defaultReducerValue: ValuesInputsState = {
    youtubeLinkValue: '',
    codeValue: '',
    contextValue: '',
    timingValue: '',
    actorValue: ''
}

function reducer(state: ValuesInputsState, action: ValuesInputsAction): ValuesInputsState {
    switch (action.type) {
        case "CHANGE_YOUTUBE_LINK": return { ...state, youtubeLinkValue: action.payload }
        case "CHANGE_CODE_VALUE": return { ...state, codeValue: action.payload }
        case "CHANGE_CONTEXT_VALUE": return { ...state, contextValue: action.payload }
        case "CHANGE_TIMING_VALUE": return { ...state, timingValue: action.payload }
        case "CHANGE_ACTOR_VALUE": return { ...state, actorValue: action.payload }
        default: throw new Error('Unknow type action for reducer ValuesInputs');
    }
}

export default reducer;