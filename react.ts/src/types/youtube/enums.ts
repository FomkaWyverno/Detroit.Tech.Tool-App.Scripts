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