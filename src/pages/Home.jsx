// src/pages/Home.jsx
import { useEffect, useState } from 'react'
import { getPokemons } from '../services/api'
import { Box, SimpleGrid, Text, Spinner, Center, Button } from '@chakra-ui/react'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPokemons()
      .then(data => setPokemons(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <Box p={6}>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {pokemons.map((pokemon, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
            <Text fontWeight="bold" mb={2}>{pokemon.name.toUpperCase()}</Text>
            <Button colorScheme="teal" size="sm">Ver más</Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Home
