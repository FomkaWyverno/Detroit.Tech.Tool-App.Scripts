import BooleanBlockInfo from './BooleanBlockInfo/BooleanBlockInfo'
import InfoBlock from './InfoBlock/InfoBlock'
import style from './KeyInfo.module.scss'

interface IKeyInfoProps {
    className?: string
    maxHeight?: string
    maxWidth?: string

    containerId?: string | null
    locKey?: string | null
    text?: string | null
    hasInTable?: boolean | null
    locationKey?: string | null
}

function KeyInfo({
    className = '',
    maxHeight,
    maxWidth,

    containerId,
    locKey,
    text,
    hasInTable,
    locationKey,
}: IKeyInfoProps) {


    const containerStyle = {
        maxHeight,
        maxWidth,
    } as React.CSSProperties

    return (
        <div className={`${style.key_info} ${className}`}
            style={containerStyle}>      
            <InfoBlock label="ContrainerId:" text={containerId ?? "-"}/>
            <InfoBlock label="Key:" text={locKey ?? "-"}/>
            <InfoBlock label="Text:" text={text ?? "-"} wordBreak='break-word' />
            <BooleanBlockInfo label="Ключ присутній у таблиці?" trueText='Ні' falseText='Так' state={hasInTable}/>
            <InfoBlock label="Місцезнаходження ключа:" text={locationKey ?? "-"}/>
        </div>
    )
}

export default KeyInfo
