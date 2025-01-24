import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube"
import style from "./YoutubeVideo.module.scss"
import { useEffect, useRef, useState } from "react"
import { YouTubeErrorEvent, YouTubePlaybackRateChangeEvent, YouTubePlayerChangeStateEvent, YouTubePlayerPlaybackQualityChangeEvent, YouTubePlayerReadyEvent, YouTubePlayerState, YouTubeVideoPlayer } from "../../types/youtube.d"
import { YouTubePlayerUtil } from "../../utils/YouTubePlayerUtil"

interface IYoutubeVideo {
    videoURL?: string
}

function YoutubeVideo({
    videoURL = ''
}: IYoutubeVideo) {
    const [videoId, setVideoId] = useState<string>('QD1pbWCJcKQ')
    const [player, setPlayer] = useState<YouTubeVideoPlayer | null>(null);
    const trackerTimer = useRef<number | null>(null);

    const getVideoIdFromURL = (videoURL: string): string => {
        if (videoURL?.startsWith('https://youtu.be/')) {
            const url: URL = new URL(videoURL);
            const paths = url.pathname.split('/');
            const parsedVideoId = paths[1] || videoId;
            return parsedVideoId;
        }
        if (videoURL?.startsWith('https://www.youtube.com/watch')) {
            const urlParams: URLSearchParams = new URLSearchParams(videoURL.split('?')[1]);
            const parsedVideoId: string | null = urlParams.get('v');
            if (parsedVideoId) {
                return parsedVideoId;
            } else {
                return videoId;
            }
        }
        return videoId;      
    }

    const startTrackingTime = () => {
        if (!trackerTimer.current && player) {
            trackerTimer.current = window.setInterval(() => {
            console.log(player.getCurrentTime());
          }, 1000); // Оновлюємо час кожну секунду
        }
    };

    const stopTrackingTime = () => {
        if (trackerTimer.current) {
          window.clearInterval(trackerTimer.current); // Очищаємо інтервал
          trackerTimer.current = null;
        }
    };

    useEffect(() => {
        if (videoURL && videoURL !== '') {
            const newVideoId = getVideoIdFromURL(videoURL);
            if (player && newVideoId) {
                player.loadVideoById({videoId: newVideoId, startSeconds: 0});
                console.log('New Video ' + videoURL);
                setVideoId(newVideoId);
            }
        }
    }, [videoURL]); 

    const onReadyHandler: YouTubeProps['onReady'] = (e: YouTubeEvent<any>) => {
        const event: YouTubePlayerReadyEvent = YouTubePlayerUtil.toReadyEvent(e);
        console.log('Ready player');
        console.log(event.target);
        setPlayer(event.target);
    }

    const onStateChangeHandler: YouTubeProps['onStateChange'] = (e: YouTubeEvent<number>) => {
        const event: YouTubePlayerChangeStateEvent = YouTubePlayerUtil.toChangeStateEvent(e);
        console.log('State change');
        console.log(event)
        switch (event.state) {
            case YouTubePlayerState.PLAYING: {
                startTrackingTime();
                break;
            }
            case YouTubePlayerState.PAUSED:
            case YouTubePlayerState.ENDED:
            case YouTubePlayerState.UNKNOW: {
                stopTrackingTime();
                break;
            }
        }
    }

    const onPlaybackQualityChangeHandler: YouTubeProps['onPlaybackQualityChange'] = (e: YouTubeEvent<any>) => {
        const event: YouTubePlayerPlaybackQualityChangeEvent = YouTubePlayerUtil.toPlaybackQualityChangeEvent(e);
        console.log('Playback Quality change');
        console.log(event);

    }

    const onPlaybackRateChangeHandler: YouTubeProps['onPlaybackRateChange'] = (e: YouTubeEvent<number>) => {
        const event: YouTubePlaybackRateChangeEvent = YouTubePlayerUtil.toPlaybackRateChangeEvent(e);
        console.log('Playback rate change');
        console.log(event);
    }

    const onErrorHandler: YouTubeProps['onError'] = (e) => {
        const event: YouTubeErrorEvent = YouTubePlayerUtil.toErrorEvent(e);
        console.log('YT Error')
        console.error(event);
    }

    const opts: YouTubeProps['opts'] = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1
        }
    }
    return (
        <YouTube
            className={style.youtube_container}
            videoId='QD1pbWCJcKQ'
            opts={opts}
            onReady={onReadyHandler}
            onStateChange={onStateChangeHandler}
            onPlaybackQualityChange={onPlaybackQualityChangeHandler}
            onPlaybackRateChange={onPlaybackRateChangeHandler}
            onError={onErrorHandler}/>
    )
}

export default YoutubeVideo
