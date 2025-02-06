import { useState, useRef, useEffect, useCallback } from "react";
import Card from "./components/Card/Card";
import ControlingPanel from "./components/ContolingPanel/ControlingPanel";
import GridLayout from "./components/GridLayout/GridLayout";
import InputsContainer from "./components/InputsContainer/InputsContainer";
import KeyInfo from "./components/KeyInfo/KeyInfo";
import YoutubeVideo from "./components/YoutubeVideo/YoutubeVideo";
import useCodeHandler from "./hooks/app/useCodeHandler";
import useYoutubeHandler from "./hooks/app/useYoutubeHandler";
import useControlingButtons from "./hooks/app/useControlingButtonts/useControlingButtons";
import * as InputsContainerReducer from "./components/InputsContainer/InputsContainerReducer";
import useGlossaryItemHandler from "./hooks/app/useGlossaryItemHandler";
import MessagePopup from "./components/MessagePopup/MessagePopup";



export function App() {
    const [keyInfoHeight, setKeyInfoHeight] = useState<string>();
    const [inputsValues, setInputsValues] = useState<InputsContainerReducer.ValuesInputsState>(InputsContainerReducer.defaultReducerValue);

    const { youtubeURL, contextValue, timing, youtubeLinkOnChange, handleTimeOnChange, contextOnChange, timingOnChange } = useYoutubeHandler();
    const { codeHandlerState, codeOnChange } = useCodeHandler();
    const { onClickAddInSheetButton, onClickSearchButton } = useControlingButtons(codeHandlerState.localizationKey, codeHandlerState.localizationSheetKey, inputsValues);
    const { onClickGlossaryItem, actorOnChange, actor_value } = useGlossaryItemHandler();

    const onChangeInputsValue = useCallback((values: InputsContainerReducer.ValuesInputsState) => setInputsValues(values),[]);

    const wrapperKeys = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (wrapperKeys.current) {
            setKeyInfoHeight(wrapperKeys.current.scrollHeight + 'px');
        }
    },[]);

    return (
        <GridLayout>
            <MessagePopup message="error" isVisible={true}/>
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
                actorOnChange={actorOnChange} actor_value={actor_value}
                onChangeInputsValue={onChangeInputsValue}
                />
            <Card component_style={{height: "310px", width: "515px"}} dynamic_height={false} isScrolling={false}>
                <ControlingPanel
                    voiceCode={codeHandlerState.localizationKey?.voiceCode ?? null}
                    onClickAddInSheetButton={onClickAddInSheetButton}
                    onClickSearchButton={onClickSearchButton}
                    onClickGlossaryItem={onClickGlossaryItem}
                    />
            </Card>
        </GridLayout>
    )
}