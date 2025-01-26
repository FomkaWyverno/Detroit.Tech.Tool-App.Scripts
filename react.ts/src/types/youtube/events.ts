import { YouTubePlayerState, YouTubePlaybackQuality, YouTubePlayerError } from "./enums"
import { YouTubeVideoPlayer } from "./interfaces"

interface YouTubeBaseEvent {
    target: YouTubeVideoPlayer
}

export interface YouTubePlayerReadyEvent extends YouTubeBaseEvent { }
export interface YouTubePlayerChangeStateEvent extends YouTubeBaseEvent {
    state: YouTubePlayerState
}
export interface YouTubePlayerPlaybackQualityChangeEvent extends YouTubeBaseEvent {
    quality: YouTubePlaybackQuality
}
export interface YouTubePlaybackRateChangeEvent extends YouTubeBaseEvent {
    speedRate: number
}
export interface YouTubeErrorEvent extends YouTubeBaseEvent {
    error: YouTubePlayerError
}
