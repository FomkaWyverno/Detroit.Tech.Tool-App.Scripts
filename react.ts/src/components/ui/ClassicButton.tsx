import { CSSProperties, MouseEvent} from "react"
import SoundManager from "../../utils/SoundManager"

interface IClassicButton {
    className?: string
    style_component?: CSSProperties
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    text?: string
}

function ClassicButton({
    className,
    style_component,
    onClick,
    text
}: IClassicButton) {
    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        SoundManager.playClickSound();
        if (onClick) onClick(e);
    }

    const onMouseEnterHandler = (e: MouseEvent<HTMLButtonElement>) => SoundManager.playHoverSound();

    return (
        <button className={`classic_button ${className}`} style={style_component} onMouseEnter={onMouseEnterHandler} onClick={onClickHandler}>{text}</button>
    )
}

export default ClassicButton
