import { useRef } from "react";
import { YouTubeProps, YouTubeEvent } from "react-youtube";
import { YouTubePlaybackRateChangeEvent, YouTubePlayerChangeStateEvent, YouTubePlayerState, YouTubeVideoPlayer } from "../../../types/youtube";
import { YouTubePlayerUtil } from "../../../utils/YouTubePlayerUtil";


function useYouTubePlayerTrackTime(
    player: YouTubeVideoPlayer | null,
    changeTime: (youtubeURL: string, time: number) => void
): [YouTubeProps['onStateChange'], YouTubeProps['onPlaybackRateChange']] {
    const trackerTimer = useRef<number | null>(null);

    const startTrackingTime = () => {
        if (!trackerTimer.current && player) {
            console.log(`Швидкість відтворення: ${player.getPlaybackRate()} Для перегляду однієї секунди потрібно: ${1000 / player.getPlaybackRate()}`)
            trackerTimer.current = window.setInterval(() => {
                if (player) {
                    changeTime(player.getVideoUrl(), player.getCurrentTime());
                    console.log(player.getCurrentTime());
                }
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

    const onStateChangeHandler: YouTubeProps['onStateChange'] = (e: YouTubeEvent<number>) => {
        const event: YouTubePlayerChangeStateEvent = YouTubePlayerUtil.toChangeStateEvent(e);
        console.log('State change traking?');
        console.log(event)
        switch (event.state) {
            case YouTubePlayerState.PLAYING: {
                console.log('Start tracking')
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

    const onPlaybackRateChangeHandler: YouTubeProps['onPlaybackRateChange'] = (e: YouTubeEvent<number>) => {
        const event: YouTubePlaybackRateChangeEvent = YouTubePlayerUtil.toPlaybackRateChangeEvent(e);
        console.log('Playback rate change');
        console.log(event);
        if (trackerTimer.current) {
            stopTrackingTime();
            startTrackingTime();
        }
    }

    return [onStateChangeHandler, onPlaybackRateChangeHandler];
}

export default useYouTubePlayerTrackTime