import Card from '../Card/Card'
import style from './MessagePopup.module.scss'

interface IMessagePopup {
    message?: string,
    isVisible: boolean
}

function MessagePopup({
    message,
    isVisible
}: IMessagePopup) {

    return (
        <Card className={`${style.card_message_popup} ${isVisible ? '' : style.card_message_popup__hide}`}>
            <div>{message}</div>
        </Card>
    )
}

export default MessagePopup
