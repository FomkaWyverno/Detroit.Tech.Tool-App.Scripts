import { useEffect, useState } from "react"
import { YouTubeVideoPlayer } from "../../types/youtube";
import { getVideoIdFromURL } from "../../utils/YouTubePlayerUtil";


function useYouTubeURLSync(youtubePlayer: YouTubeVideoPlayer | null, youtubeURL: string) {
    useEffect(() => {
        if (youtubePlayer && youtubeURL && youtubeURL !== '') {
            const newVideoId = getVideoIdFromURL(youtubeURL);
            if (newVideoId) {
                youtubePlayer.loadVideoById({videoId: newVideoId, startSeconds: 0});
                console.log('New Video ' + youtubeURL);
            }
        }
    }, [youtubeURL]);
}
export default useYouTubeURLSync