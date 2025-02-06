import { ChangeEvent, useEffect, useMemo, useReducer } from "react";
import InputText from "../ui/InputText/InputText";
import style from './InputsContainer.module.scss';
import reducer, * as InputsContainerReducer from "./InputsContainerReducer";

function createWrapper(
    type: "CHANGE_YOUTUBE_LINK" | "CHANGE_CODE_VALUE" | "CHANGE_CONTEXT_VALUE" | "CHANGE_TIMING_VALUE" | "CHANGE_ACTOR_VALUE",
    dispatch: React.Dispatch<InputsContainerReducer.ValuesInputsAction>,
    handler?: (e: ChangeEvent<HTMLInputElement>) => void,
): (e: ChangeEvent<HTMLInputElement>) => void {
    return (e: ChangeEvent<HTMLInputElement>) => {
        handler?.(e);
        dispatch({ type, payload: e.target.value });
    }
}

interface IInputsContainer {
    youtubeLinkOnChange?: (e: ChangeEvent<HTMLInputElement>) => void
    codeOnChange?: (e: ChangeEvent<HTMLInputElement>) => void
    contextOnChange?: (e: ChangeEvent<HTMLInputElement>) => void
    timingOnChange?: (e: ChangeEvent<HTMLInputElement>) => void
    actorOnChange?: (e: ChangeEvent<HTMLInputElement>) => void


    onChangeInputsValue?: (newInputsValues: InputsContainerReducer.ValuesInputsState) => void

    context_value?: string
    timing_value?: string
    actor_value?: string
}

function InputsContainer({
    youtubeLinkOnChange,
    codeOnChange,
    contextOnChange,
    timingOnChange,
    actorOnChange,

    onChangeInputsValue,

    context_value,
    timing_value,
    actor_value
}: IInputsContainer) {
    const [state, dispatch] = useReducer(reducer, InputsContainerReducer.defaultReducerValue);

    useEffect(() => {
        onChangeInputsValue?.(state);
    }, [onChangeInputsValue, state]);

    const wrapperYoutubeLinkOnChange = useMemo(() => createWrapper("CHANGE_YOUTUBE_LINK", dispatch, youtubeLinkOnChange), [youtubeLinkOnChange]);
    const wrapperCodeOnChange = useMemo(() => createWrapper("CHANGE_CODE_VALUE", dispatch, codeOnChange), [codeOnChange]);

    useEffect(() => { 
        if (context_value !== null && context_value !== undefined) {
            dispatch({ type: "CHANGE_CONTEXT_VALUE", payload: context_value });
        }
    }, [context_value]);
    useEffect(() => {
        if (timing_value !== null && timing_value !== undefined) {
            dispatch({ type: "CHANGE_TIMING_VALUE", payload: timing_value });
        } 
    }, [timing_value]);
    useEffect(() => {
        if (actor_value !== null && actor_value !== undefined) {
            dispatch({ type: "CHANGE_ACTOR_VALUE", payload: actor_value });
        }
    }, [actor_value]);

    return (
        <div className={style.inputs_container}>
            <InputText id="youtube-link-input" placeholder="Посилання на Youtube" onChange={wrapperYoutubeLinkOnChange} />
            <InputText id="code-input" placeholder="Введіть код" onChange={wrapperCodeOnChange} />
            <InputText id="context-input" placeholder="Введіть контекст" onChange={contextOnChange} value_input={context_value} />
            <InputText id="timing-input" placeholder="Введіть таймінг" onChange={timingOnChange} value_input={timing_value} />
            <InputText id="actor" placeholder="Введіть актора" onChange={actorOnChange} value_input={actor_value}/>
        </div>
    )
}

export default InputsContainer
