import { useState, useRef, useEffect } from "react";
import Card from "./components/Card/Card";
import ControlingPanel from "./components/ContolingPanel/ControlingPanel";
import GridLayout from "./components/GridLayout/GridLayout";
import InputsContainer from "./components/InputsContainer/InputsContainer";
import KeyInfo from "./components/KeyInfo/KeyInfo";
import YoutubeVideo from "./components/YoutubeVideo/YoutubeVideo";
import useCodeHandler from "./hooks/app/useCodeHandler";
import useYoutubeHandler from "./hooks/app/useYoutubeHandler";
import useControlingButtons from "./hooks/app/useControlingButtonts/useControlingButtons";



export function App() {
    const [keyInfoHeight, setKeyInfoHeight] = useState<string>();

    const { youtubeURL, contextValue, timing, youtubeLinkOnChange, handleTimeOnChange, contextOnChange, timingOnChange } = useYoutubeHandler();
    const { codeHandlerState, codeOnChange } = useCodeHandler();
    const { onClickAddInSheetButton, onClickSearchButton } = useControlingButtons(codeHandlerState.localizationKey, codeHandlerState.localizationSheetKey);

    const wrapperKeys = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (wrapperKeys.current) {
            setKeyInfoHeight(wrapperKeys.current.scrollHeight + 'px');
        }
    },[]);

    return (
        <GridLayout>
            <YoutubeVideo videoURL={youtubeURL} handleTimeOnChange={handleTimeOnChange}/>
            <div ref={wrapperKeys}>
                <Card component_style={{ width: "515px", maxHeight: keyInfoHeight }}>
                    <KeyInfo localizationKey={codeHandlerState.localizationKey} localizationSheetKey={codeHandlerState.localizationSheetKey}/>
                </Card>
            </div>
            <InputsContainer
                youtubeLinkOnChange={youtubeLinkOnChange}
                contextOnChange={contextOnChange} context_value={contextValue}
                timingOnChange={timingOnChange} timing_value={timing}
                codeOnChange={codeOnChange}
                />
            <Card component_style={{height: "310px", width: "515px"}} dynamic_height={false} isScrolling={false}>
                <ControlingPanel
                    voiceCode={codeHandlerState.localizationKey?.voiceCode ?? null}
                    onClickAddInSheetButton={onClickAddInSheetButton}
                    onClickSearchButton={onClickSearchButton}
                    />
            </Card>
        </GridLayout>
    )
}