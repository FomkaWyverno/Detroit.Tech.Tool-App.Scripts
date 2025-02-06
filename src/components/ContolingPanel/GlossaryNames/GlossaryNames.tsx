import { useEffect, useRef, useState } from "react"
import GlossaryList from "./GlossaryList/GlossaryList"
import style from "./GlossaryName.module.scss"

interface IGlossaryNames {
    height?: string
    voiceCode: string | null
    onClickItem?: (item_name: string) => void
}

function GlossaryNames({
    height = 'auto',
    voiceCode,
    onClickItem
}: IGlossaryNames) {
    const [heightList, setHeightList] = useState<string>('auto');
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => { // Розраховуємо висоту листа глосарію, щоб лист не виліз за межі контейнера
        if (headerRef.current && height !== 'auto') { // Якщо референс Хедер присутній, та висота не Авто
            const headerHeight: number = headerRef.current.offsetHeight; // Дізнаємось висоту Хедера
            const heightGlossaryNames: number = parseInt(height || '0', 10); // Дізнаємось висоту яку нам передали по пропсам для всього Глосарію
            const adjustHeightList: string = `${heightGlossaryNames - headerHeight}px`; // Рахуємо потрібну висоту для листа глосарію
            console.log(`Height GlossaryList: ${adjustHeightList}`);
            setHeightList(adjustHeightList); // Встановлюємо коректовану висоту листа
        }
    
    },[height]);

    return (
        <div className={style.glossary_names}>
            <div ref={headerRef} className={style.glossary_names__header}>
                <h2 className={style.glossary_names__header__title}>Словник імен</h2>
                <div className={style.glossary_names__header__details_code}>
                    <h3 className={style.glossary_names__header__details_code__text}>Код персонажа:</h3>
                    <span className={style.glossary_names__header__details_code__code}>{voiceCode ?? '-'}</span>
                </div>
            </div>
            <GlossaryList height={heightList} voiceCode={voiceCode} onClickItem={onClickItem}/>
        </div>
    )
}

export default GlossaryNames
