import GlossaryList from "./GlossaryList/GlossaryList"
import style from "./GlossaryName.module.scss"

interface IGlossaryNames {}

function GlossaryNames(props: IGlossaryNames) {
    const {} = props

    return (
        <div className={style.glossary_names}>
            <div className={style.glossary_names__header}>
                <h2 className={style.glossary_names__header__title}>Словник імен</h2>
                <div className={style.glossary_names__header__details_code}>
                    <h3 className={style.glossary_names__header__details_code__text}>Код персонажа:</h3>
                    <span className={style.glossary_names__header__details_code__code}>-</span>
                </div>
            </div>
            <GlossaryList/>
        </div>   
    )
}

export default GlossaryNames
