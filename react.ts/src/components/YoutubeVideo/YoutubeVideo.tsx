import YouTube, { YouTubeProps } from "react-youtube"
import style from "./YoutubeVideo.module.scss"
import useYouTubeURLSync from "../../hooks/youtube/useYouTubeURLSync"
import useYouTubePlayerOnReady from "../../hooks/youtube/events/useYouTubePlayerOnReady"
import useYouTubePlayerTrackTime from "../../hooks/youtube/events/useYouTubePlayerTrackTime"
import useYouTubePlayerError from "../../hooks/youtube/events/useYouTubePlayerError"

interface IYoutubeVideo {
    videoURL?: string
    handleTimeChange: (youtubeURL: string, time: number) => void
}

function YoutubeVideo({
    videoURL = '',
    handleTimeChange
}: IYoutubeVideo) {
    const [player, onReadyHandler] = useYouTubePlayerOnReady();
    useYouTubeURLSync(player, videoURL);
    const handleError = useYouTubePlayerError();
    const [handleStateChange, handlePlaybackRate] = useYouTubePlayerTrackTime(player, handleTimeChange);

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
            onStateChange={handleStateChange}
            onPlaybackRateChange={handlePlaybackRate}
            onError={handleError}
            />
    )
}

export default YoutubeVideo
