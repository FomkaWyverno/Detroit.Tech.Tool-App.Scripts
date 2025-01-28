import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/main.scss'
import { AppContext } from './context/AppContext'
import AppInitializer from './components/AppInitializer/AppInitializer'

createRoot(document.getElementById('root')!).render(
    <AppContext.Provider value={{}}>
        <AppInitializer>
            <App/>
        </AppInitializer>
    </AppContext.Provider>
)