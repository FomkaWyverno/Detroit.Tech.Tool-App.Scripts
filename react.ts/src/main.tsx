import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/main.scss'
import AppInitializer from './components/AppInitializer/AppInitializer'

createRoot(document.getElementById('root')!).render(
    <AppInitializer>
        <App />
    </AppInitializer>
)