import { useState } from "react";
import { YouTubePlayerReadyEvent, YouTubeVideoPlayer } from "../../../types/youtube";
import { YouTubeProps, YouTubeEvent } from "react-youtube";
import { YouTubePlayerUtil } from "../../../utils/YouTubePlayerUtil";

function useYouTubePlayerOnReady(): [YouTubeVideoPlayer | null, YouTubeProps['onReady']] {
    const [player, setPlayer] = useState<YouTubeVideoPlayer | null>(null);

    const onReadyHandler: YouTubeProps['onReady'] = (e: YouTubeEvent<any>) => {
        const event: YouTubePlayerReadyEvent = YouTubePlayerUtil.toReadyEvent(e);
        console.log('Ready player');
        console.log(event.target);
        setPlayer(event.target);
    }

    return [player, onReadyHandler]
}

export default useYouTubePlayerOnReady