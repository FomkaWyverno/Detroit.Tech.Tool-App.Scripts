import { useState, useCallback, ChangeEvent } from "react";
import formatTime from "../../utils/TimeFormatUtil";
import { getVideoIdFromURL } from "../../utils/YouTubePlayerUtil";


/**
 * Хук `useYoutubeHandler` обробляє введення YouTube-посилання та керує часом відео в інпуті для таймінга.
 * 
 * @returns Об'єкт із властивостями:
 * - `youtubeURL`: Поточне YouTube-посилання.
 * - `contextValue`: Контекстне значення, якщо відео відтворюється буде оновлювати посилання з відео яке буде вказувати на поточний таймінг.
 * - `timing`: Форматований таймкод у відео.
 * - `youtubeLinkOnChange`: Функція обробки зміни посилання на YouTube.
 * - `handleTimeOnChange`: Функція, приймає посилання на Ютуб, та поточний таймінг, після чого оновлює контекстне посилання та таймкод.
 * - `contextOnChange`: Функція обробки зміни контекстного значення.
 * - `timingOnChange`: Функція обробки зміни таймкоду.
 */
function useYoutubeHandler(): {
    youtubeURL: string,
    contextValue: string,
    timing: string,
    youtubeLinkOnChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleTimeOnChange: (youtubeURL: string, time: number) => void
    contextOnChange: (e: ChangeEvent<HTMLInputElement>) => void
    timingOnChange: (e: ChangeEvent<HTMLInputElement>) => void
} {
    // Локальні стани для збереження посилання, таймінгу та контексту
    const [youtubeURL, setYoutubeURL] = useState('');
    const [contextValue, setContextValue] = useState<string>('');
    const [timing, setTiming] = useState<string>('');

    // Функція обробки зміни посилання на YouTube
    const youtubeLinkOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (youtubeURL != e.target.value) setYoutubeURL(e.target.value);
    }, [youtubeURL]);

    // Функція встановлення таймінгу у відео
    const handleTimeOnChange = useCallback((youtubeURL: string, time: number) => {
        setContextValue(`https://youtu.be/${getVideoIdFromURL(youtubeURL)}?t=${Math.trunc(time)}`);
        setTiming(formatTime(time));        
    },[]);

    // Функція обробки зміни контекстного значення
    const contextOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setContextValue(e.target.value);
    },[]);

    // Функція обробки зміни таймкоду
    const timingOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTiming(e.target.value);
    },[]);

    return {
        youtubeURL,
        contextValue,
        timing,
        youtubeLinkOnChange,
        handleTimeOnChange,
        contextOnChange,
        timingOnChange
    }
}

export default useYoutubeHandler;