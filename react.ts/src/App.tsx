import { ReactNode } from "react"
import Loader from "./components/Loader"

export function App() {
    return (
        <div className="test">
            <Loader>Hey</Loader>
        </div>
    )
}