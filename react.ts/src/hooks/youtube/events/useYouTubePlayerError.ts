import { YouTubeProps } from "react-youtube";
import { YouTubePlayerUtil } from "../../../utils/YouTubePlayerUtil";
import { YouTubeErrorEvent } from "../../../types/youtube";



function useYouTubePlayerError(): YouTubeProps['onError'] {
    const onErrorHandler: YouTubeProps['onError'] = (e) => {
        const event: YouTubeErrorEvent = YouTubePlayerUtil.toErrorEvent(e);
        console.error('YouTube-Player Error:')
        console.error(event);
    }

    return onErrorHandler;
}

export default useYouTubePlayerError