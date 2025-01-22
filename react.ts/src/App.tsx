import Card from "./components/Card/Card";
import ControlingPanel from "./components/ContolingPanel/ControlingPanel";
import KeyInfo from "./components/KeyInfo/KeyInfo";


export function App() {
    return (
        <>
            <Card component_style={{ width: "400px", maxHeight: "300px" }}>
                <KeyInfo />
            </Card>
            <Card>
                <ControlingPanel></ControlingPanel>
            </Card>
        </>
    )
}