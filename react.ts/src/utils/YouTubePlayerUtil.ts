import * as ReactYouTubeTypes from '../types/youtube';
import { YouTubeEvent } from "react-youtube"

interface IYouTubePlayerUtil {
    toReadyEvent: (e: YouTubeEvent<any>) => ReactYouTubeTypes.YouTubePlayerReadyEvent
    toChangeStateEvent: (e: YouTubeEvent<number>) => ReactYouTubeTypes.YouTubePlayerChangeStateEvent
    toPlaybackQualityChangeEvent: (e: YouTubeEvent<string>) => ReactYouTubeTypes.YouTubePlayerPlaybackQualityChangeEvent
    toPlaybackRateChangeEvent: (e: YouTubeEvent<number>) => ReactYouTubeTypes.YouTubePlaybackRateChangeEvent
    toErrorEvent: (e: YouTubeEvent<number>) => ReactYouTubeTypes.YouTubeErrorEvent
}

export const YouTubePlayerUtil: IYouTubePlayerUtil = {
    toReadyEvent: (e: YouTubeEvent<any>): ReactYouTubeTypes.YouTubePlayerReadyEvent => {
        return {
            target: e.target
        }
    },
    toChangeStateEvent: (e: YouTubeEvent<number>): ReactYouTubeTypes.YouTubePlayerChangeStateEvent => {
        const state: ReactYouTubeTypes.YouTubePlayerState = ReactYouTubeTypes.YouTubePlayerState[e.data as unknown as keyof typeof ReactYouTubeTypes.YouTubePlayerState] ?? ReactYouTubeTypes.YouTubePlayerState.UNKNOW
        return {
            state,
            target: e.target
        }
    },
    toPlaybackQualityChangeEvent(e: YouTubeEvent<string>): ReactYouTubeTypes.YouTubePlayerPlaybackQualityChangeEvent {
        const quality = Object.values(ReactYouTubeTypes.YouTubePlaybackQuality).includes(e.data as ReactYouTubeTypes.YouTubePlaybackQuality)
            ? e.data as ReactYouTubeTypes.YouTubePlaybackQuality
            : ReactYouTubeTypes.YouTubePlaybackQuality.UNKNOW
        return {
            quality,
            target: e.target
        }
    },
    toPlaybackRateChangeEvent(e: YouTubeEvent<number>): ReactYouTubeTypes.YouTubePlaybackRateChangeEvent {
        return {
            speedRate: e.data,
            target: e.target
        }
    },
    toErrorEvent(e: YouTubeEvent<number>): ReactYouTubeTypes.YouTubeErrorEvent {
        const error: ReactYouTubeTypes.YouTubePlayerError = ReactYouTubeTypes.YouTubePlayerError[e.data as unknown as keyof typeof ReactYouTubeTypes.YouTubePlayerError] ?? ReactYouTubeTypes.YouTubePlayerError.UNKNOW;
        return {
            error,
            target: e.target
        }
    }
}