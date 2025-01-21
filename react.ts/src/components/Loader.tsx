import React, { ReactNode } from 'react'

interface LoaderProps {
    children: ReactNode
}

function Loader(props: LoaderProps) {
    const {children} = props

    return (
        <span>{children}</span>
    )
}

export default Loader
