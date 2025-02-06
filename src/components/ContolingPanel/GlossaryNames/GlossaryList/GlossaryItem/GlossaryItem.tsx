import { useCallback } from "react"
import style from "./GlossaryItem.module.scss"
import SoundManager from "../../../../../utils/SoundManager"


interface IGlossaryItem {
    name: string
    onClick?: (item_name: string) => void
}

function GlossaryItem({
    name,
    onClick
}: IGlossaryItem) {
    const onClickHandler = useCallback(() => {
        SoundManager.playClickSound(0.2);
        if (onClick) onClick(name);
    },[name, onClick]);
    const onMouseEnterHandler = useCallback(() => {
        SoundManager.playHoverSound(0.2);
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
