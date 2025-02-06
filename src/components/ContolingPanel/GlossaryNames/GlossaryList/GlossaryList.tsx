import { useContext, useEffect, useRef, useState } from "react";
import GlossaryItem from "./GlossaryItem/GlossaryItem";
import style from "./GlossaryList.module.scss";
import { ActorNamesContext } from "../../../../context/ActorNamesContex";

interface IGlossaryList {
    height?: string
    voiceCode: string | null
    onClickItem?: (item_name: string) => void
}

function GlossaryList({
    height = 'auto',
    voiceCode,
    onClickItem
}: IGlossaryList) {
    const [listHeight, setListHeight] = useState('auto');
    const listRef = useRef<HTMLUListElement>(null);
    const [listNames, setListNames] = useState<string[]>([]);

    const { actorNamesByVoiceKey } = useContext(ActorNamesContext);


    useEffect(() => { // Розрахунок висоти елемент <ul>
        if (listRef.current && height !== 'auto') { // Якщо референс Листа є та висота не Авто
            const listMarginTopPx: string = window.getComputedStyle(listRef.current).marginTop; // Дізнаємось у листа верхній марджін,
            const listMarginTop: number = parseInt(listMarginTopPx || '0', 10); // Перетворюємо верхній марджін з пікселів у число
            const listHeight: number = parseInt(height || '0', 10); // Дізнаємось скільки нам дали місця для розсташування листа

            const adjustHeight: string = `${listHeight - listMarginTop}px`; // Рахуємо висоту. Висота яка є для Листа

            console.log(`Element UL: ${adjustHeight}`);

            setListHeight(adjustHeight);

        }
    },[height]);

    useEffect(() => {
        if (!voiceCode || !actorNamesByVoiceKey.has(voiceCode)) {
            setListNames([]);
            return;
        }

        setListNames(actorNamesByVoiceKey.get(voiceCode) || []);
    }, [voiceCode, actorNamesByVoiceKey]);



    return (
        <ul ref={listRef} className={`scrolling-y ${style.glossary_list}`} style={{height: listHeight}}>
            {listNames.map((name) => <GlossaryItem key={`${voiceCode}.${name}`} name={name} onClick={onClickItem}/>)}
        </ul>        
    )
}

export default GlossaryList
