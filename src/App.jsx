import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import InputName from './components/InputName'
import Pokedex from './components/Pokedex'
import Pokemon from './components/Pokemon'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<InputName />} />
          <Route element={<ProtectedRoutes />} >
            <Route path='/pokedex' element={<Pokedex />} />
            <Route path='/pokedex/:id' element={<Pokemon />} />
          </Route>
        </Routes>
        <footer>By Walter Tomás Castagno</footer>
      </div>
    </HashRouter>
  )
}

export default App
