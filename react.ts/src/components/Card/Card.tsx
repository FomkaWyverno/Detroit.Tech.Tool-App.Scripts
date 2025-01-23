import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import style from './Card.module.scss'


interface ICardProps {
    children?: ReactNode
    component_style?: CSSProperties,
    dynamic_height?: boolean
    isScrolling?: boolean
}

/**
 * Компонент `Card` використовується для створення контейнера з динамічним обчисленням висоти
 * та опцією прокручування.
 *
 * @param {ICardProps} props Властивості компонента.
 * @param {ReactNode} [props.children] Вміст компонента (дочірні елементи).
 * @param {CSSProperties} [props.component_style] Стилі для кореневого елемента компонента.
 * @param {boolean} [props.dynamic_height=true] Якщо `true`, висота компонента буде змінюватися динамічно залежно від вмісту.
 * @param {boolean} [props.isScrolling=true] Якщо `true`, додається можливість вертикального прокручування.
 * @returns {JSX.Element} JSX-елемент для рендерингу.
 *
 * @example
 * Використання компонента Card
 * ```TSX
 * import Card from './Card';
 *
 * function App() {
 *     return (
 *         <Card component_style={{ maxHeight: '300px' }} dynamic_height={true} isScrolling={false}>
 *             Контент у картці
 *         </Card>
 *     );
 * }
 * ```
 */
function Card({
    children,
    component_style = {},
    dynamic_height = true,
    isScrolling = true
}: ICardProps) {
    const [currentHeight, setCurrentHeight] = useState<string | number | undefined>(component_style?.height);
    const [maxHeightWrapper, setMaxHeightWrapper] = useState<string | undefined>(undefined);
    const cardRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (dynamic_height) {
            if (cardRef.current) {
                const computedStyle = window.getComputedStyle(cardRef.current);
    
                const cardMaxHeight = parseInt(computedStyle.maxHeight || '0', 10);
                const cardPaddingTop = parseInt(computedStyle.paddingTop || '0', 10);
                const cardPaddingBottom = parseInt(computedStyle.paddingBottom || '0', 10);
    
                const adjustMaxHeight = cardMaxHeight - (cardPaddingTop + cardPaddingBottom);
                if (adjustMaxHeight) {
                    setMaxHeightWrapper(adjustMaxHeight + 'px');
                }
            }
    
    
            const resizeObserver = new ResizeObserver(() => {
                if (wrapperRef.current && cardRef.current) {
                    const computedStyle = window.getComputedStyle(cardRef.current);
    
                    const wrapperHeight = wrapperRef.current.scrollHeight;
                    const cardPaddingTop = parseInt(computedStyle.paddingTop || '0', 10);
                    const cardPaddingBottom = parseInt(computedStyle.paddingBottom || '0', 10);
    
    
                    const adjustHeight = wrapperHeight + cardPaddingBottom + cardPaddingTop;
                    setCurrentHeight(adjustHeight + 'px');
                }
            });

            if (wrapperRef.current) {
                resizeObserver.observe(wrapperRef.current);
            }
    
            return () => {
                if (wrapperRef.current) {
                    resizeObserver.unobserve(wrapperRef.current);
                }
            }
        }
    }, [component_style]);

    return (
        <div
            className={style.card}
            style={{...component_style, height: currentHeight}}
            ref={cardRef}>
            <div
                className={`${style.card_wrapper} ${isScrolling ? 'scrolling-y' : ''}`}
                style={{maxHeight: maxHeightWrapper}}
                ref={wrapperRef}>
                {children}
            </div>
        </div>
    )
}

export default Card
