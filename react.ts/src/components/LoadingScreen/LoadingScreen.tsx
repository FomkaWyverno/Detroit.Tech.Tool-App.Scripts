import Icon_Loader from '../../assets/led_spinner.svg?react'
import style from './LoadingScreen.module.scss'

interface ILoadingScreen {
    state: string
    error_msg?: string
}

function LoadingScreen({
    state,
    error_msg
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
        </div>
    )
}

export default LoadingScreen
