import { LocalizationKey } from '../../models/localization/LocalizationKey'
import { LocalizationSheetKey } from '../../models/localization/LocalizationSheetKey'
import BooleanBlockInfo from './BooleanBlockInfo/BooleanBlockInfo'
import InfoBlock from './InfoBlock/InfoBlock'
import style from './KeyInfo.module.scss'

interface IKeyInfoProps {
    className?: string
    maxHeight?: string
    maxWidth?: string

    localizationKey: LocalizationKey | null
    localizationSheetKey: LocalizationSheetKey | null
}

function KeyInfo({
    className = '',
    maxHeight,
    maxWidth,

    localizationKey,
    localizationSheetKey
}: IKeyInfoProps) {


    const containerStyle = {
        maxHeight,
        maxWidth,
    } as React.CSSProperties

    return (
        <div className={`${style.key_info} ${className}`}
            style={containerStyle}>      
            <InfoBlock label="ContrainerId:" text={String(localizationKey?.containerId ?? "-")}/>
            <InfoBlock label="Key:" text={localizationKey?.key ?? '-'}/>
            <InfoBlock label="Text:" text={localizationKey?.text ?? "-"} wordBreak='break-word' />
            <BooleanBlockInfo label="Ключ присутній у таблиці?" trueText='Ні' falseText='Так' state={localizationSheetKey ? false : true}/>
            <InfoBlock label="Місцезнаходження ключа:" wordBreak='break-word' text={localizationSheetKey?.locationKey.toA1Notation() ?? "-"}/>
        </div>
    )
}

export default KeyInfo
