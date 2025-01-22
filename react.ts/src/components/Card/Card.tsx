import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import style from './Card.module.scss'

interface ICardProps {
    children?: ReactNode
    component_style?: CSSProperties
}

function Card({
    children,
    component_style = {}
}: ICardProps) {
    const [currentHeight, setCurrentHeight] = useState<string | number | undefined>(component_style?.height);
    const [maxHeightWrapper, setMaxHeightWrapper] = useState<string | undefined>(undefined);
    const cardRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const wrapperStyle = {
        maxHeight: maxHeightWrapper
    } as React.CSSProperties;

    useEffect(() => {
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
    }, []);

    return (
        <div
            className={style.card}
            style={{...component_style, height: currentHeight}}
            ref={cardRef}>
            <div
                className={`${style.card_wrapper} scrolling-y`}
                style={wrapperStyle}
                ref={wrapperRef}>
                {children}
            </div>
        </div>
    )
}

export default Card
