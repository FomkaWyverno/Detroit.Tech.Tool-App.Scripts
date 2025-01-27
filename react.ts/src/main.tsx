import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/main.scss'
import { AppContext } from './context/AppContext'

createRoot(document.getElementById('root')!).render(
    <AppContext.Provider value={{}}>
        <App></App>
    </AppContext.Provider>
)