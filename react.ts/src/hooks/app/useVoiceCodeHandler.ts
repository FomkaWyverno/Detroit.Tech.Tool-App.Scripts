import { useEffect, useState } from "react";
import { getVoiceKey } from "../../utils/LocalizationUtil";


function useVoiceCodeHandler(localizationKey: string | null): {
    voiceCode: string | null
} {
    const [voiceCode, setVoiceCode] = useState<string | null>(null);   

    useEffect(() => {
        if (localizationKey) {
            setVoiceCode(getVoiceKey(localizationKey) ?? null)
        }
    }, [localizationKey]);

    return {
        voiceCode
    }
}

export default useVoiceCodeHandler;