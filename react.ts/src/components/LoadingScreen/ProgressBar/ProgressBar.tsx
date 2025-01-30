import React from 'react'
import style from './ProgressBar.module.scss'

interface IProgressBar {
    width: number
    progress: number
}

function ProgressBar({
    width,
    progress
}: IProgressBar) {

    return (
        <div className={style.progress_bar} style={{width: width}}>
            <div className={`${style.progress_bar_fill} ${progress < 0 ? style.progress_bar_fill__infitity : ''}`} style={progress > -1 ? {width: width * progress} : {}}></div>
        </div>
    )
}

export default ProgressBar
