import { YouTubeEvent } from "react-youtube";

interface ObjectArgsVideoId {
    videoId: string,
    startSeconds?: float,
    endSeconds?: float
}

interface ObjectArgsVideoUrl {
    mediaContentUrl: string,
    startSeconds?: float,
    endSeconds?: float
}

export interface YouTubeVideoPlayer {
    
    /**
     * This function loads and plays the specified video.
     *
     * @param videoId The required parameter specifies the YouTube Video ID of the video to be played. In the YouTube Data API, a video resource's id property specifies the ID.
     * @param startSeconds The optional parameter accepts a float/integer. If it is specified, then the video will start from the closest keyframe to the specified time.
     * @param endSeconds The optional parameter accepts a float/integer. If it is specified, then the video will stop playing at the specified time.
     * @return {(objectArgsVideoId: ObjectArgsVideoId) => void}
     * 
     * 
     * Ця функція завантажує та відтворює вказане відео.
     *
     * @param videoId Обов'язковий параметр вказує ідентифікатор YouTube Video ID відео, яке потрібно відтворити. У YouTube Data API ідентифікатор вказується у властивості id відеоресурсу.
     * @param startSeconds Необов'язковий параметр приймає значення з плаваючою комою/ціле число. Якщо він вказаний, то відео почнеться з найближчого до вказаного часу ключового кадру.
     * @param endSeconds Необов'язковий параметр приймає значення з плаваючою комою/ціле число. Якщо його вказати, то відео буде зупинено у вказаний час.
     * @return {(objectArgsVideoId: ObjectArgsVideoId) => void}
     */
    loadVideoById: (objectArgsVideoId: ObjectArgsVideoId) => void

    
    /**
     * This function loads the specified video's thumbnail and prepares the player to play the video. The player does not request the FLV until playVideo() or seekTo() is called.
     *
     * @param videoId The required parameter specifies the YouTube Video ID of the video to be played. In the YouTube Data API, a video resource's id property specifies the ID.
     * @param startSeconds The optional parameter accepts a float/integer and specifies the time from which the video should start playing when playVideo() is called. If you specify a startSeconds value and then call seekTo(), then the player plays from the time specified in the seekTo() call. When the video is cued and ready to play, the player will broadcast a video cued event (5).
     * @param endSeconds The optional parameter, which is only supported in object syntax, accepts a float/integer and specifies the time when the video should stop playing when playVideo() is called. If you specify an endSeconds value and then call seekTo(), the endSeconds value will no longer be in effect.
     * @return {(objectArgsVideoId: ObjectArgsVideoId) => void}
     * 
     * Ця функція завантажує мініатюру вказаного відео і готує програвач до відтворення відео. Плеєр не запитує FLV до виклику playVideo() або seekTo().
     *
     * @param videoId Обов'язковий параметр визначає ідентифікатор YouTube Video ID відео, яке потрібно відтворити. У YouTube Data API ідентифікатор вказується у властивості id відеоресурсу.
     * @param startSeconds Необов'язковий параметр приймає значення з плаваючою комою/ціле число і вказує час, з якого має початися відтворення відео при виклику playVideo(). Якщо вказати значення startSeconds, а потім викликати seekTo(), то програвач почне відтворення з часу, вказаного у виклику seekTo(). Коли відео буде синхронізоване і готове до відтворення, плеєр видасть подію синхронізації (5).
     * @param endSeconds Необов'язковий параметр, який підтримується тільки в об'єктному синтаксисі, приймає значення з плаваючою комою/ціле число і вказує час, коли відео має припинити відтворення при виклику playVideo(). Якщо вказати значення endSeconds, а потім викликати seekTo(), то значення endSeconds більше не буде чинним.
     * @return {objectArgsVideoId: ObjectArgsVideoId) => void}
     */
    cueVideoById: (objectArgsVideoId: ObjectArgsVideoId) => void

    
    /**
     * This function loads the specified video's thumbnail and prepares the player to play the video. The player does not request the FLV until playVideo() or seekTo() is called.
     *
     * @param mediaContentUrl The required parameter specifies a fully qualified YouTube player URL in the format http://www.youtube.com/v/VIDEO_ID?version=3.
     * @param startSeconds The optional parameter accepts a float/integer and specifies the time from which the video should start playing when playVideo() is called. If you specify startSeconds and then call seekTo(), then the player plays from the time specified in the seekTo() call. When the video is cued and ready to play, the player will broadcast a video cued event (5).
     * @param endSeconds The optional parameter, which is only supported in object syntax, accepts a float/integer and specifies the time when the video should stop playing when playVideo() is called. If you specify an endSeconds value and then call seekTo(), the endSeconds value will no longer be in effect.
     * @return {(objectArgsVideoUrl: ObjectArgsVideoUrl) => void}
     * 
     * Ця функція завантажує мініатюру вказаного відео і готує програвач до відтворення відео. Плеєр не запитує FLV до виклику playVideo() або seekTo().
     *
     * @param mediaContentUrl Обов'язковий параметр задає повну URL-адресу плеєра YouTube у форматі http://www.youtube.com/v/VIDEO_ID?version=3.
     * @param startSeconds Необов'язковий параметр приймає значення з плаваючою комою/ціле число і вказує час, з якого має розпочатися відтворення відео при виклику playVideo(). Якщо вказати startSeconds, а потім викликати seekTo(), то програвач почне відтворення з часу, вказаного у виклику seekTo(). Коли відео буде синхронізовано і готове до відтворення, плеєр транслюватиме подію синхронізації відео (5).
     * @param endSeconds Необов'язковий параметр, який підтримується тільки в об'єктному синтаксисі, приймає значення з плаваючою комою/цілим числом і вказує час, коли відео має припинити відтворення при виклику playVideo(). Якщо ви вкажете значення endSeconds, а потім викличете seekTo(), значення endSeconds вже не буде чинним.
     * @return {(objectArgsVideoUrl: ObjectArgsVideoUrl) => void}
     */
    cueVideoByUrl: (objectArgsVideoUrl: ObjectArgsVideoUrl) => void

    
    /**
     * This function loads and plays the specified video.
     *
     * @param mediaContentUrl The required parameter specifies a fully qualified YouTube player URL in the format http://www.youtube.com/v/VIDEO_ID?version=3.
     * @param startSeconds The optional parameter accepts a float/integer and specifies the time from which the video should start playing. If startSeconds (number can be a float) is specified, the video will start from the closest keyframe to the specified time.
     * @param endSeconds The optional parameter, which is only supported in object syntax, accepts a float/integer and specifies the time when the video should stop playing.
     * @return {(objectArgsVideoUrl: ObjectArgsVideoUrl) => void}
     *  
     * Ця функція завантажує та відтворює вказане відео.
     *
     * @param mediaContentUrl Обов'язковий параметр вказує повну URL-адресу плеєра YouTube у форматі http://www.youtube.com/v/VIDEO_ID?version=3.
     * @param startSeconds Необов'язковий параметр приймає значення з плаваючою комою/ціле число і вказує час, з якого має початися відтворення відео. Якщо вказано startSeconds (число може бути числом з плаваючою комою), то відео почнеться з найближчого до вказаного часу ключового кадру.
     * @param endSeconds Необов'язковий параметр, який підтримується лише в об'єктному синтаксисі, приймає значення з плаваючою комою/цілим числом і вказує час, коли відео має завершитися.
     * @return {(objectArgsVideoUrl: ObjectArgsVideoUrl) => void}
     */
    loadVideoByUrl: (objectArgsVideoUrl: ObjectArgsVideoUrl) => void
}

interface YouTubeBaseEvent {
    target: YouTubeVideoPlayer
}

export enum YouTubePlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
    UNKNOW = 'unknow'
}

export enum YouTubePlaybackQuality {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
    HD720 = 'hd720',
    HD1080 = 'hd1080',
    HIGHRES = 'highres',
    UNKNOW = 'unknow'
}

export enum YouTubePlayerError {
    INVALID_PARAMETER = 2,
    HTML5_PLAYER_ERROR = 5,
    VIDEO_NOT_FOUND = 100,
    VIDEO_NOT_ALLOWED_IN_EMBEDDED = 101,
    VIDEO_NOT_ALLOWED_IN_EMBEDDED_2 = 150,
    UNKNOW = 'unknow'
}

export interface YouTubePlayerReadyEvent extends YouTubeBaseEvent {}
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
