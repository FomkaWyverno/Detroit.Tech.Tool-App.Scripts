import { MouseEvent, MouseEventHandler, useCallback } from "react"
import style from "./GlossaryItem.module.scss"
import SoundManager from "../../../../../utils/SoundManager"


interface IGlossaryItem {
    name: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

function GlossaryItem({
    name,
    onClick
}: IGlossaryItem) {
    const onClickHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        SoundManager.playClickSound();
        if (onClick) onClick(e);
    },[onClick]);
    const onMouseEnterHandler = useCallback(() => {
        SoundManager.playHoverSound();
    },[]);
    return (
        <li className={style.glossary_item}>
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
