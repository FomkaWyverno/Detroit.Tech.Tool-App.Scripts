import { ChangeEvent } from "react";
import InputText from "../ui/InputText/InputText";
import style from './InputsContainer.module.scss';

interface IInputsContainer {
    youtubeLinkOnChange?: (e: ChangeEvent<HTMLInputElement>) => void
    codeOnChange?: (e: ChangeEvent<HTMLInputElement>) => void
    contextOnChange?: (e: ChangeEvent<HTMLInputElement>) => void
    timingOnChange?: (e: ChangeEvent<HTMLInputElement>) => void
    actorOnChange?: (e: ChangeEvent<HTMLInputElement>) => void

    context_value?: string
}

function InputsContainer({
    youtubeLinkOnChange,
    codeOnChange,
    contextOnChange,
    timingOnChange,
    actorOnChange,

    context_value
}: IInputsContainer) {

    return (
        <div className={style.inputs_container}>
            <InputText id="youtube-link-input" placeholder="Посилання на Youtube" onChange={youtubeLinkOnChange }/>
            <InputText id="code-input" placeholder="Введіть код" onChange={codeOnChange}/>
            <InputText id="context-input" placeholder="Введіть контекст" onChange={contextOnChange} value_input={context_value}/>
            <InputText id="timing-input" placeholder="Введіть таймінг" onChange={timingOnChange}/>
            <InputText id="actor" placeholder="Введіть актора" onChange={actorOnChange}/>
        </div>        
    )
}

export default InputsContainer
