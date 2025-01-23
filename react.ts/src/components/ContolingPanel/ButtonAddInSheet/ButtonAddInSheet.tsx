import ClassicButton from '../../ui/ClassicButton'
import { MouseEvent } from 'react'
import style from './ButtonAddSheet.module.scss'

interface IButtonAddSheet {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

function ButtonAddInSheet({
    onClick
}: IButtonAddSheet) {
    return (
        <ClassicButton className={style.button_add_in_sheet} text="Додати в таблицю" onClick={onClick}/>
    )
}

export default ButtonAddInSheet
