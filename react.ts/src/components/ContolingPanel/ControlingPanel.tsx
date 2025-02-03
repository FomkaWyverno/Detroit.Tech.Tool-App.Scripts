import { useEffect, useRef, useState } from "react"
import ButtonAddInSheet from "./ButtonAddInSheet/ButtonAddInSheet"
import ButtonSearchKeyInSheet from "./ButtonSearchKeyInSheet/ButtonSearchKeyInSheet"
import GlossaryNames from "./GlossaryNames/GlossaryNames";
import style from './ControlingPanel.module.scss'


interface IControlingPanel {
    voiceCode: string | null
}

function ControlingPanel({
    voiceCode
}: IControlingPanel) {
    const panelRef = useRef<HTMLDivElement>(null);
    const buttonsWrapperRef = useRef<HTMLDivElement>(null);
    const glossaryWrapperRef = useRef<HTMLDivElement>(null);
    const [glossaryHeight, setGlossaryHeight] = useState<string>('auto'); 

    useEffect(() => { // Робимо розрахунки висоти для Глосарію імен
        if (panelRef.current && buttonsWrapperRef.current && glossaryWrapperRef.current) { // Має бути присутній ціла панель, обгортки кнопок та глосарію
            const panelHeight: number = panelRef.current.offsetHeight; // Дізнаємось висоту панелі
            const buttonsWrapperHeight: number = buttonsWrapperRef.current.offsetHeight; // Дізнаємось висоту кнопок
            const glossaryWrapperPaddingBottom: number = parseInt(window.getComputedStyle(glossaryWrapperRef.current).paddingBottom || '0', 10); // Дізнаємось нижній паддінг обгортки глосарію
            const glossaryHeight: string = `${panelHeight - buttonsWrapperHeight - glossaryWrapperPaddingBottom}px`; // Рахуємо висоту глосарію
            console.log(`Glossary Height: ${glossaryHeight}`); 
            setGlossaryHeight(glossaryHeight); // Встановлюємо висоту глосарію імен
        }
    },[]);

    return (
        <div ref={panelRef} className={style.controling_panel}>
            <div ref={buttonsWrapperRef} className={style.controling_wrapper}>
                <ButtonAddInSheet/>
                <ButtonSearchKeyInSheet/>
            </div>
            <div ref={glossaryWrapperRef} className={style.controling_wrapper} style={{flexGrow: 1}}>
                <GlossaryNames height={glossaryHeight} voiceCode={voiceCode}/>
            </div>
        </div>
    )
}

export default ControlingPanel
