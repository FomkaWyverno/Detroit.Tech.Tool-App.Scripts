import { ReactNode } from "react"
import style from './GridLayout.module.scss'

interface IGridLayout {
    children: ReactNode
}

function GridLayout({
    children
}: IGridLayout) {

    return (
        <div className={style.grid_layout}>
            {children}
        </div>
    )
}

export default GridLayout
