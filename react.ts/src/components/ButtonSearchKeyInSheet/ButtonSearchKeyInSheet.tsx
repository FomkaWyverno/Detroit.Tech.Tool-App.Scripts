import ClassicButton from "../ui/ClassicButton"
import { MouseEvent } from "react"
import style from './ButtonSearchSheet.module.scss'

interface IButtonSearchKeyInSheet {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

function ButtonSearchKeyInSheet({
    onClick
}: IButtonSearchKeyInSheet) {
    return (
        <ClassicButton className={style.button_search_in_sheet} text="Знайти в таблиці" onClick={onClick}/>
    )
}

export default ButtonSearchKeyInSheet
