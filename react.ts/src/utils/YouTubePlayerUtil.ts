import { YouTubeEvent } from "react-youtube"
import { YouTubePlayerReadyEvent, YouTubePlayerChangeStateEvent, YouTubePlayerPlaybackQualityChangeEvent, YouTubePlayerState, YouTubePlaybackQuality, YouTubePlaybackRateChangeEvent, YouTubeErrorEvent, YouTubePlayerError } from "../types/youtube.d"

interface IYouTubePlayerUtil {
    toReadyEvent: (e: YouTubeEvent<any>) => YouTubePlayerReadyEvent
    toChangeStateEvent: (e: YouTubeEvent<number>) => YouTubePlayerChangeStateEvent
    toPlaybackQualityChangeEvent: (e: YouTubeEvent<string>) => YouTubePlayerPlaybackQualityChangeEvent
    toPlaybackRateChangeEvent: (e: YouTubeEvent<number>) => YouTubePlaybackRateChangeEvent
    toErrorEvent: (e: YouTubeEvent<number>) => YouTubeErrorEvent
}

export const YouTubePlayerUtil: IYouTubePlayerUtil = {
    toReadyEvent: (e: YouTubeEvent<any>): YouTubePlayerReadyEvent => {
        return {
            target: e.target
        }
    },
    toChangeStateEvent: (e: YouTubeEvent<number>): YouTubePlayerChangeStateEvent => {
        const state: YouTubePlayerState = YouTubePlayerState[e.data as unknown as keyof typeof YouTubePlayerState] ?? YouTubePlayerState.UNKNOW
        return {
            state,
            target: e.target
        }
    },
    toPlaybackQualityChangeEvent(e: YouTubeEvent<string>): YouTubePlayerPlaybackQualityChangeEvent {
        const quality = Object.values(YouTubePlaybackQuality).includes(e.data as YouTubePlaybackQuality)
            ? e.data as YouTubePlaybackQuality
            : YouTubePlaybackQuality.UNKNOW
        return {
            quality,
            target: e.target
        }
    },
    toPlaybackRateChangeEvent(e: YouTubeEvent<number>): YouTubePlaybackRateChangeEvent {
        return {
            speedRate: e.data,
            target: e.target
        }
    },
    toErrorEvent(e: YouTubeEvent<number>): YouTubeErrorEvent {
        const error: YouTubePlayerError = YouTubePlayerError[e.data as unknown as keyof typeof YouTubePlayerError] ?? YouTubePlayerError.UNKNOW;
        return {
            error,
            target: e.target
        }
    }
}