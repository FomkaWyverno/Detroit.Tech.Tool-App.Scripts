import style from "./InfoBlock.module.scss"

interface IInfoBlockProps {
    label: string
    text?: string | null
    wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word' 
    
}

function InfoBlock(
{
    label,
    text = '-',
    wordBreak
}: IInfoBlockProps) {
    return (
        <div className={style.block} style={{wordBreak: wordBreak}}>
            <span>{label}</span>
            <span className={style.info_block_text}>{text}</span>
        </div>
    )
}

export default InfoBlock
