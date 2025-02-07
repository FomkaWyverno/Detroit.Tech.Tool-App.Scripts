import { createRoot } from 'react-dom/client'
import { App } from './App'
import AppInitializer from './components/AppInitializer/AppInitializer'
import ActorNamesContextProvider from './context/ActorNamesContextProvider'
import './styles/main.scss'
import LocSheetKeysContextProvider from './context/LocSheetKeysContextProvider'

createRoot(document.getElementById('root')!).render(
    <ActorNamesContextProvider>
        <LocSheetKeysContextProvider>
            <AppInitializer>
                <App />
            </AppInitializer>
        </LocSheetKeysContextProvider>
    </ActorNamesContextProvider>
)