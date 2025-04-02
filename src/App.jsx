import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'
import Favorites from './pages/Favorites'
import Compare from './pages/Compare'
import Navbar from './components/Navbar'
import { Box } from '@chakra-ui/react'
import TopList from './pages/TopList'
import Team from './pages/Team';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <Navbar />
      <Analytics />
      <Box
  as="main"
  pt={6}
  pb={10}
  px={{ base: 4, md: 6 }}
  maxW="1200px"
  mx="auto"
  bg="gray.50"
  minH="100vh"
  w="100%"
>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/comparar" element={<Compare />} />
          <Route path="/top" element={<TopList />} />
          <Route path="/equipo" element={<Team />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
