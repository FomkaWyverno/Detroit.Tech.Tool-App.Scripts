import style from './BooleanBlockInfo.module.scss'

interface IBooleanBlockInfo {
    label: string
    state: boolean
    trueText: string
    falseText: string
}

function BooleanBlockInfo({
    label,
    state,
    trueText,
    falseText
}: IBooleanBlockInfo) {
    return (
        <div className={style.block_boolean_info}>
            <span>{label}</span>
            {state ?
            <span className={`${style.block_boolean_label} ${style.block_boolean_label__true}`}>{trueText}</span>
            :
            <span className={`${style.block_boolean_label} ${style.block_boolean_label__false}`}>{falseText}</span>}
        </div>
    )
}

export default BooleanBlockInfo
