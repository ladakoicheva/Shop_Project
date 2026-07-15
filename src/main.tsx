import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

const root = document.getElementById('root');
if (!root) {
  throw new Error("root is not defined");
}

createRoot(root).render(
    <Provider store={store}>
        <App />
        </Provider>
)
 