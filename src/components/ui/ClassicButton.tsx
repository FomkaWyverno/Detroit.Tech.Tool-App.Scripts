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

    const onMouseEnterHandler = () => SoundManager.playHoverSound(0.2);

    return (
        <button className={`classic_button ${className}`} style={style_component} onMouseEnter={onMouseEnterHandler} onClick={onClick}>{text}</button>
    )
}

export default ClassicButton
