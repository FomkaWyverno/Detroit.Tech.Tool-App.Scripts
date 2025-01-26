import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube"
import style from "./YoutubeVideo.module.scss"
import { useRef, useState } from "react"
import { YouTubeVideoPlayer } from "../../types/youtube/interfaces"
import { YouTubePlayerUtil } from "../../utils/YouTubePlayerUtil"
import * as ReactYouTubeTypes from "../../types/youtube"
import useYouTubeURLSync from "../../hooks/youtube/useYouTubeURLSync"


interface IYoutubeVideo {
    videoURL?: string
    setContextValue: (context: string) => void
}

function YoutubeVideo({
    videoURL = '',
    setContextValue
}: IYoutubeVideo) {
    const [player, setPlayer] = useState<YouTubeVideoPlayer | null>(null);
    const trackerTimer = useRef<number | null>(null);

    useYouTubeURLSync(player, videoURL);
    
    const startTrackingTime = () => {
        if (!trackerTimer.current && player) {
            console.log(`Швидкість відтворення: ${player.getPlaybackRate()} Для перегляду однієї секунди потрібно: ${1000 / player.getPlaybackRate()}`)
            trackerTimer.current = window.setInterval(() => {
                setContextValue(player.getCurrentTime().toString());
                console.log(player.getCurrentTime());
            }, 1000 / player.getPlaybackRate()); // Оновлюємо кожну секунду у плеере, враховуючи швидкість відео.
            // Затримка таймаута вираховується шляхом ділення поточної швидкості на 1 секунду в мс. Як приклад 1000 / 0,25 = 4000 або 1000 / 1,25 = 800
        }
    };

    const stopTrackingTime = () => {
        if (trackerTimer.current) {
          window.clearInterval(trackerTimer.current); // Очищаємо інтервал
          trackerTimer.current = null;
        }
    };

    const onReadyHandler: YouTubeProps['onReady'] = (e: YouTubeEvent<any>) => {
        const event: ReactYouTubeTypes.YouTubePlayerReadyEvent = YouTubePlayerUtil.toReadyEvent(e);
        console.log('Ready player');
        console.log(event.target);
        setPlayer(event.target);
    }

    const onStateChangeHandler: YouTubeProps['onStateChange'] = (e: YouTubeEvent<number>) => {
        const event: ReactYouTubeTypes.YouTubePlayerChangeStateEvent = YouTubePlayerUtil.toChangeStateEvent(e);
        console.log('State change traking?');
        console.log(event)
        console.log(event.state === ReactYouTubeTypes.YouTubePlayerState.PLAYING)
        console.log(event.state)
        console.log(ReactYouTubeTypes.YouTubePlayerState.PLAYING)
        switch (event.state) {
            case ReactYouTubeTypes.YouTubePlayerState.PLAYING: {
                console.log('Start tracking')
                startTrackingTime();
                break;
            }
            case ReactYouTubeTypes.YouTubePlayerState.PAUSED:
            case ReactYouTubeTypes.YouTubePlayerState.ENDED:
            case ReactYouTubeTypes.YouTubePlayerState.UNKNOW: {
                stopTrackingTime();
                break;
            }
        }
    }

    const onPlaybackQualityChangeHandler: YouTubeProps['onPlaybackQualityChange'] = (e: YouTubeEvent<any>) => {
        const event: ReactYouTubeTypes.YouTubePlayerPlaybackQualityChangeEvent = YouTubePlayerUtil.toPlaybackQualityChangeEvent(e);
        console.log('Playback Quality change');
        console.log(event);

    }

    const onPlaybackRateChangeHandler: YouTubeProps['onPlaybackRateChange'] = (e: YouTubeEvent<number>) => {
        const event: ReactYouTubeTypes.YouTubePlaybackRateChangeEvent = YouTubePlayerUtil.toPlaybackRateChangeEvent(e);
        console.log('Playback rate change');
        console.log(event);
        stopTrackingTime();
        startTrackingTime();
    }

    const onErrorHandler: YouTubeProps['onError'] = (e) => {
        const event: ReactYouTubeTypes.YouTubeErrorEvent = YouTubePlayerUtil.toErrorEvent(e);
        console.error('YouTube-Player Error:')
        console.error(event);
    }

    const opts: YouTubeProps['opts'] = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1
        }
    }

    console.log('Render Youtube')
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
