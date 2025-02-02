import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/main.scss'
import AppInitializer from './components/AppInitializer/AppInitializer'
import ActorNamesContextProvider from './context/ActorNamesContextProvider'

createRoot(document.getElementById('root')!).render(
    <ActorNamesContextProvider>
        <AppInitializer>
            <App />
        </AppInitializer>
    </ActorNamesContextProvider>
)