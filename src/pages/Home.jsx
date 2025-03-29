import { useEffect, useState } from 'react'
import { getPokemons } from '../services/api'
import { Box, SimpleGrid, Spinner, Center } from '@chakra-ui/react'
import PokemonCard from '../components/PokemonCard'

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
          <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Home
