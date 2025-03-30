import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetaill'
import Favorites from './pages/Favorites'
import Compare from './pages/Compare'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/comparar" element={<Compare />} />
      </Routes>
    </>
  )
}

export default App
