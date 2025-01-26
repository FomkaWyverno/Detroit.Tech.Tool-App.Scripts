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
        const state: ReactYouTubeTypes.YouTubePlayerState = 
                    Object.values(ReactYouTubeTypes.YouTubePlayerState).includes(e.data)
                    ? e.data
                    : ReactYouTubeTypes.YouTubePlayerState.UNKNOW;
        return {
            state,
            target: e.target
        }
    },
    toPlaybackQualityChangeEvent(e: YouTubeEvent<string>): ReactYouTubeTypes.YouTubePlayerPlaybackQualityChangeEvent {
        const quality: ReactYouTubeTypes.YouTubePlaybackQuality = Object.values(ReactYouTubeTypes.YouTubePlaybackQuality).includes(e.data as ReactYouTubeTypes.YouTubePlaybackQuality)
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

export const getVideoIdFromURL = (videoURL: string): string => {
    if (videoURL?.startsWith('https://youtu.be/')) {
        const url: URL = new URL(videoURL);
        const paths = url.pathname.split('/');
        const parsedVideoId = paths[1];
        return parsedVideoId ? parsedVideoId : '';
    }
    if (videoURL?.startsWith('https://www.youtube.com/watch')) {
        const urlParams: URLSearchParams = new URLSearchParams(videoURL.split('?')[1]);
        const parsedVideoId: string | null = urlParams.get('v');
        return parsedVideoId ? parsedVideoId : '';
    }
    
    return '';
}
