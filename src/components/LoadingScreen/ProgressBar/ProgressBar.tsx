import React, { useEffect, useRef, useState } from 'react'
import style from './ProgressBar.module.scss'

interface IProgressBar {
    width: number
    progress: number
}

function ProgressBar({
    width,
    progress
}: IProgressBar) {
    const fillRef = useRef<HTMLDivElement | null>(null);
    const [translateX, setTranslateX] = useState<string>('translateX(0%)');

    useEffect(() => { // Анімація безкінечного прогрессу
        if (progress < 0 && fillRef.current) {
            return animation_infinity_progress(fillRef, setTranslateX)
        }
    }, [progress]);

    return (
        <div className={style.progress_bar} style={{width: width}}>
            <div
                className={
                    `${style.progress_bar_fill}
                     ${progress < 0 ? style.progress_bar_fill__infitity : ''}`}
                
                style={
                    progress > -1 ? {width: width * progress} : {transform: translateX}}
                ref={fillRef}
                    ></div>
        </div>
    )
}

export default ProgressBar

function animation_infinity_progress(
    fillRef: React.MutableRefObject<HTMLDivElement | null>, 
    setTranslateX: React.Dispatch<React.SetStateAction<string>>
) {
    const duration: number = getTransitionDurationInMs(fillRef.current!);
    let startTime: number | null = null; 
    const stepAnimation = (timeStamp: number) => {
        if (!startTime) startTime = timeStamp;

        const elapsed = timeStamp - startTime;

        if (elapsed >= duration) {
            setTranslateX((prev: string) => prev === 'translateX(0%)' ? 'translateX(calc(100% * 9))' : 'translateX(0%)');
            startTime = timeStamp;
        }

        animationId = window.requestAnimationFrame(stepAnimation);
    }

    setTimeout(() => {
        setTranslateX('translateX(calc(100% * 9))');
    }, 0);

    let animationId = window.requestAnimationFrame(stepAnimation);

    return () => { // Функція для відміни анімації. Потрібно, щоб useEffect відмінив анімацію, після того як прогресс стане не безкінеченим.
        window.cancelAnimationFrame(animationId);
        setTranslateX('translateX(0%)');
    }
}

function getTransitionDurationInMs(element: HTMLElement): number {
    const computedStyle = window.getComputedStyle(element);
    const duration = computedStyle.transitionDuration; // Наприклад, "0.3s"

    const durationInMs = duration.includes('ms') 
        ? parseFloat(duration) 
        : parseFloat(duration) * 1000;

    return durationInMs;
}