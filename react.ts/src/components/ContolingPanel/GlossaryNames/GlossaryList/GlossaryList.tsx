import { useEffect, useRef, useState } from "react";
import GlossaryItem from "./GlossaryItem/GlossaryItem";
import style from "./GlossaryList.module.scss";

interface IGlossaryList {
    height?: string
}

function GlossaryList({
    height = 'auto'
}: IGlossaryList) {
    const [listHeight, setListHeight] = useState('auto');
    const listRef = useRef<HTMLUListElement>(null);

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

    const items = new Map<string, string[]>([
        ["X01ANDROID", ["Джон", "Сара", "Люсі","Джон", "Сара", "Люсі","Джон", "Сара", "Люсі","Джон", "Сара", "Люсі","Джон", "Сара", "Люсі"]],
    ]);

    const key = items.get('X01ANDROID');

    return (
        <ul ref={listRef} className={`scrolling-y ${style.glossary_list}`} style={{height: listHeight}}>
            {key?.map((name, index) => <GlossaryItem index={index} name={name}/>)}
        </ul>        
    )
}

export default GlossaryList
