// src/App.jsx
import { Box, Heading } from '@chakra-ui/react'
import Home from './pages/Home'

function App() {
  return (
    <Box textAlign="center" p={4}>
      <Heading mb={6}>Pokédex</Heading>
      <Home />
    </Box>
  )
}

export default App
