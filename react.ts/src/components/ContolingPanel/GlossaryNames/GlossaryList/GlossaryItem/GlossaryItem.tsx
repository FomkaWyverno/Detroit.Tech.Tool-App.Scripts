import { MouseEvent } from "react"
import style from "./GlossaryItem.module.scss"
import SoundManager from "../../../../../utils/SoundManager"


interface IGlossaryItem {
    index: number
    name: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

function GlossaryItem({
    index,
    name,
    onClick
}: IGlossaryItem) {
    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        SoundManager.playClickSound();
        if (onClick) onClick(e);
    }
    const onMouseEnterHandler = () => SoundManager.playHoverSound();

    return (
        <li key={index} className={style.glossary_item}>
            <button 
                className={style.button_insert_item}
                onClick={onClickHandler}
                onMouseEnter={onMouseEnterHandler}>
                <span className={style.button_insert_item__image}></span>
            </button>
            <span className={style.glossary_item_name}>{name}</span>
        </li>
    )
}

export default GlossaryItem
