import { useState, useContext, useRef, useEffect, useCallback, ChangeEvent } from "react";
import Card from "./components/Card/Card";
import ControlingPanel from "./components/ContolingPanel/ControlingPanel";
import GridLayout from "./components/GridLayout/GridLayout";
import InputsContainer from "./components/InputsContainer/InputsContainer";
import KeyInfo from "./components/KeyInfo/KeyInfo";
import YoutubeVideo from "./components/YoutubeVideo/YoutubeVideo";
import { LocalizationKey } from "./models/localization/LocalizationKey";
import formatTime from "./utils/TimeFormatUtil";
import { getVideoIdFromURL } from "./utils/YouTubePlayerUtil";
import { LocKeyByCodeContext } from "./context/LocKeyByCodeContext";



export function App() {
    const [keyInfoHeight, setKeyInfoHeight] = useState<string>();
    const [contextValue, setContextValue] = useState<string>('');
    const [timing, setTiming] = useState<string>('');
    const [youtubeURL, setYoutubeURL] = useState('');

    const [containerId, setContainerId] = useState<string | null>(null);
    const [locKey, setLocKey] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);

    const [locationKey, setLocationKey] = useState<string | null>(null);

    const { locKeyByCode } = useContext(LocKeyByCodeContext);

    const wrapperKeys = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (wrapperKeys.current) {
            setKeyInfoHeight(wrapperKeys.current.scrollHeight + 'px');
        }
    },[]);

    const youtubeLinkOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (youtubeURL != e.target.value) setYoutubeURL(e.target.value);
    }, [youtubeURL]);

    const codeOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        if (locKeyByCode.has(value)) {
            const locKey: LocalizationKey = locKeyByCode.get(value)!;
            console.log(locKey);
            setContainerId(locKey.containerId.toString());
            setLocKey(locKey.key);
            setText(locKey.text);
        } else {
            setContainerId(null);
            setLocKey(null);
            setText(null);
        }
    }, [locKeyByCode]);

    const handleTimeChange = useCallback((youtubeURL: string, time: number) => {
        setContextValue(`https://youtu.be/${getVideoIdFromURL(youtubeURL)}?t=${Math.trunc(time)}`);
        setTiming(formatTime(time));        
    },[]);
    const contextOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setContextValue(e.target.value);
    },[]);
    const timingOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTiming(e.target.value);
    },[]);

    console.log(`Rerender key: ${locKey}`)
    return (
        <GridLayout>
            <YoutubeVideo videoURL={youtubeURL} handleTimeChange={handleTimeChange}/>
            <div ref={wrapperKeys}>
                <Card component_style={{ width: "515px", maxHeight: keyInfoHeight }}>
                    <KeyInfo containerId={containerId} locKey={locKey} text={text} locationKey={locationKey}/>
                </Card>
            </div>
            <InputsContainer
                youtubeLinkOnChange={youtubeLinkOnChange}
                contextOnChange={contextOnChange} context_value={contextValue}
                timingOnChange={timingOnChange} timing_value={timing}
                codeOnChange={codeOnChange}
                />
            <Card component_style={{height: "310px", width: "515px"}} dynamic_height={false} isScrolling={false}>
                <ControlingPanel/>
            </Card>
        </GridLayout>
    )
}