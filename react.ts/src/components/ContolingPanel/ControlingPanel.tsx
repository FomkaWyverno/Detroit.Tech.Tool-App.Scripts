import ButtonAddInSheet from "../ButtonAddInSheet/ButtonAddInSheet"
import ButtonSearchKeyInSheet from "../ButtonSearchKeyInSheet/ButtonSearchKeyInSheet"
import GlossaryNames from "../GlossaryNames/GlossaryNames"
import style from './ControlingPanel.module.scss'

interface Props {}

function ControlingPanel(props: Props) {
    const {} = props

    return (
        <div className={style.controling_panel}>
            <div className={style.controling_wrapper}>
                <ButtonAddInSheet/>
                <ButtonSearchKeyInSheet/>
            </div>
            <div className={style.controling_wrapper} style={{flexGrow: 1}}>
                <GlossaryNames/>
            </div>
        </div>
    )
}

export default ControlingPanel
