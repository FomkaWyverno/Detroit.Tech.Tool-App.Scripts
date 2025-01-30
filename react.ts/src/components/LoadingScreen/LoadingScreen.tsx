import Icon_Loader from '../../assets/led_spinner.svg?react'
import style from './LoadingScreen.module.scss'
import ProgressBar from './ProgressBar/ProgressBar'

interface ILoadingScreen {
    state: string
    error_msg?: string,
    progress: number
}

function LoadingScreen({
    state,
    error_msg,
    progress
}: ILoadingScreen) {
    return (
        <div className={style.loader_container}>
            <div>
                <Icon_Loader/>
            </div>
            <div className={style.loader_text_container}>
                <span className={style.loader_text_container__state}>{state}</span>
                <div className={style.loader_text_container__state__container}>
                    <span className={`${style.loader_text_container__state} ${style.loader_text_container__state__container__error}`}>{error_msg}</span>
                </div>
            </div>
            {!error_msg ? <ProgressBar width={500} progress={progress}/> : ''}
        </div>
    )
}

export default LoadingScreen
