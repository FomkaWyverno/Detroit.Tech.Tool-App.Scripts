import style from './BooleanBlockInfo.module.scss'

interface IBooleanBlockInfo {
    label: string
    state?: boolean | null
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
            {state == null || state == undefined // Якщо стейт це null або undefined
            ? '' // Тоді не відображаємо нічого тут
            : state // Якщо state не є null та undefined перевіряємо значення
            ? <span className={`${style.block_boolean_label} ${style.block_boolean_label__true}`}>{trueText}</span> // Якщо true
            : <span className={`${style.block_boolean_label} ${style.block_boolean_label__false}`}>{falseText}</span> // Якщо false
            }
        </div>
    )
}

export default BooleanBlockInfo
