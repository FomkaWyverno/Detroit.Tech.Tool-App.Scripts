import YouTube, { YouTubeProps } from "react-youtube"
import style from "./YoutubeVideo.module.scss"
import { useEffect, useState } from "react"
import path from "path"

interface IYoutubeVideo {
    videoURL?: string
}

function YoutubeVideo({
    videoURL = ''
}: IYoutubeVideo) {
    const [videoId, setVideoId] = useState<string>('')

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

    useEffect(() => {
        const videoID: string = getVideoIdFromURL(videoURL);
        console.log(`VideoID: ${videoID} from url: ${videoURL}`);
        setVideoId(videoID);
    }, [videoURL]); 

    const onReady: YouTubeProps['onReady'] = (event) => {
        console.log('Ready player');
        console.log(event)
        event.target.playVideo();
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
            videoId={videoId}
            opts={opts}
            onReady={onReady}/>
    )
}

export default YoutubeVideo
