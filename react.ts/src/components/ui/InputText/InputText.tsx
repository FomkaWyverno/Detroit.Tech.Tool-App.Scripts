import { ChangeEvent } from "react";
import style from "./InputText.module.scss";
import SoundManager from "../../../utils/SoundManager";

interface IInput {
    className?: string
    id: string
    autocomplete?: string
    placeholder?: string
    value_input?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}


/**
 * Стилізований компонент Інпут
 *
 * @param {IInput} param Пропси компонента 
 * @param {string} [param.className=''] Додаткові класси для контейнера інпута
 * @param {string} param.id айді інпута
 * @param {string} [param.autocomplete='off'] Автозаповнення інпута, за замовчуванням вимкнено
 * @param {string} [param.placeholder=''] Плейсхолдер
 * @param {(e: ChangeEvent<HTMLInputElement>) => void} param.onChange Заповнення інпута
 * @returns {*} Компонент
 */
function InputText({
    className = '',
    id,
    autocomplete = 'off',
    placeholder = '',
    value_input,
    onChange
}: IInput) {
    const onMouseEnterHandler = () => SoundManager.playHoverSound();
    const onClickHandler = () => SoundManager.playClickSound();

    return (
        <div className={`${style.container_input} ${className}`}>
            <input
                className={style.container_input__input}
                id={id}
                autoComplete={autocomplete}
                type="text"
                placeholder={placeholder}
                onMouseEnter={onMouseEnterHandler}
                onClick={onClickHandler}
                onChange={onChange}
                value={value_input}
                required/>
            <label
                className={style.container_input__label}
                htmlFor={id}>{placeholder}</label>
        </div>
    )
}

export default InputText
