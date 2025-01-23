import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube"
import style from "./YoutubeVideo.module.scss"
import { useEffect, useRef, useState } from "react"

interface IYoutubeVideo {
    videoURL?: string
}

function YoutubeVideo({
    videoURL = ''
}: IYoutubeVideo) {
    const [videoId, setVideoId] = useState<string>('QD1pbWCJcKQ')
    const [player, setPlayer] = useState<YouTubePlayer>(null);
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
            player?.loadVideoById(getVideoIdFromURL(videoURL), 0);
            console.log('New Video ' + videoURL)
        }
    }, [videoURL]); 

    const onReadyHandler: YouTubeProps['onReady'] = (event) => {
        console.log('Ready player');
        console.log(event.target);
        setPlayer(event.target);
    }

    const onStateChangeHandler: YouTubeProps['onStateChange'] = (e) => {
        switch (e.data) {
            case 1: {
                startTrackingTime();
                break;
            }
            case 2:
            case 0: {
                stopTrackingTime();
                break
            }
        }
    }

    const onErrorHandler: YouTubeProps['onError'] = (e) => {
        console.error(e)
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
            onError={onErrorHandler}/>
    )
}

export default YoutubeVideo
