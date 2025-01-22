import { CSSProperties, MouseEvent} from "react"

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

    return (
        <button className={`classic_button ${className}`} style={style_component} onClick={onClick}>{text}</button>
    )
}

export default ClassicButton
