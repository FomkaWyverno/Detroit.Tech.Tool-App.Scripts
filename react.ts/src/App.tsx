import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Card from "./components/Card/Card";
import ControlingPanel from "./components/ContolingPanel/ControlingPanel";
import GridLayout from "./components/GridLayout/GridLayout";
import KeyInfo from "./components/KeyInfo/KeyInfo";
import YoutubeVideo from "./components/YoutubeVideo/YoutubeVideo";
import InputsContainer from "./components/InputsContainer/InputsContainer";


export function App() {
    const [keyInfoHeight, setKeyInfoHeight] = useState<string>();
    const [contextValue, setContextValue] = useState<string>('');
    const [youtubeURL, setYoutubeURL] = useState('');
    const wrapperKeys = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (wrapperKeys.current) {
            setKeyInfoHeight(wrapperKeys.current.scrollHeight + 'px');
        }
    },[]);

    const youtubeLinkOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (youtubeURL != e.target.value) setYoutubeURL(e.target.value);
    }, []);

    const contextOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setContextValue(e.target.value);
    },[])

    return (
        <GridLayout>
            <YoutubeVideo videoURL={youtubeURL} setContextValue={setContextValue}/>
            <div ref={wrapperKeys}>
                <Card component_style={{ width: "515px", maxHeight: keyInfoHeight }}>
                    <KeyInfo/>
                </Card>
            </div>
            <InputsContainer
                youtubeLinkOnChange={youtubeLinkOnChange}
                contextOnChange={contextOnChange} context_value={contextValue}/>
            <Card component_style={{height: "310px", width: "515px"}} dynamic_height={false} isScrolling={false}>
                <ControlingPanel/>
            </Card>
        </GridLayout>
    )
}