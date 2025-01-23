import BooleanBlockInfo from './BooleanBlockInfo/BooleanBlockInfo'
import InfoBlock from './InfoBlock/InfoBlock'
import style from './KeyInfo.module.scss'

interface IKeyInfoProps {
    className?: string
    maxHeight?: string
    maxWidth?: string
}

function KeyInfo({
    className = '',
    maxHeight,
    maxWidth
}: IKeyInfoProps) {


    const containerStyle = {
        maxHeight,
        maxWidth,
    } as React.CSSProperties

    return (
        <div className={`${style.key_info} ${className}`}
            style={containerStyle}>      
            <InfoBlock label="ContrainerId:" text='-'/>
            <InfoBlock label="Key:" text='-'/>
            <InfoBlock label="Text:" text='-' wordBreak='break-word' />
            <BooleanBlockInfo label="Ключ присутній у таблиці?" trueText='Ні' falseText='Так' state={false}/>
            <InfoBlock label="Місцезнаходження ключа:" text='-'/>
        </div>
    )
}

export default KeyInfo
