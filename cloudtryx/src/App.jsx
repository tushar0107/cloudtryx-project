import './App.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { Home } from './pages/Home'

function App() {


  return (
    <>
      <Provider store={store}>
        <Home/>
      </Provider>
    </>
  )
}

export default App
