import { useEffect, useState } from 'react'
import { getPokemons } from '../services/api'
import { useSearchParams } from 'react-router-dom'
import {
    Box,
    SimpleGrid,
    Spinner,
    Center,
    HStack,
    Button ,
    Text ,
    Select ,
    Skeleton , 
    Fade
  } from '@chakra-ui/react'
import PokemonCard from '../components/PokemonCard'

function Home() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page')) || 1
  
    const limit = 20
    const total = 1010
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
  
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

  

  useEffect(() => {
    setLoading(true)
    getPokemons(limit, offset)
      .then(data => setPokemons(data))
      .finally(() => setLoading(false))
  }, [offset])

  if (loading) {
    return (
      <Box p={6}>
        <Box maxW="300px" mx="auto" mb={4}>
  <input
    type="text"
    placeholder="Buscar Pokémon..."
    value={search}
    onChange={(e) => setSearch(e.target.value.toLowerCase())}
    style={{
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: '8px'
    }}
  />
</Box>

        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {Array.from({ length: 20 }).map((_, i) => (
            <Box key={i} p={4} borderWidth="1px" borderRadius="lg">
              <Skeleton height="100px" mb={2} />
              <Skeleton height="20px" mb={2} />
              <Skeleton height="32px" />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    )
  }
  

  return (
    <Box p={6}>
      {/* 🔍 Input visible SIEMPRE */}
      <Box maxW="300px" mx="auto" mb={4}>
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}
        />
      </Box>
  
      {/* 🎲 Lista real o Skeletons */}
      {loading ? (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {Array.from({ length: 20 }).map((_, i) => (
            <Box key={i} p={4} borderWidth="1px" borderRadius="lg">
              <Skeleton height="100px" mb={2} />
              <Skeleton height="20px" mb={2} />
              <Skeleton height="32px" />
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {pokemons
            .filter(pokemon => pokemon.name.includes(search))
            .map((pokemon, index) => (
              <Fade in={!loading} key={index}>
                <PokemonCard name={pokemon.name} url={pokemon.url} />
              </Fade>
            ))}
        </SimpleGrid>
      )}
  
      {/* Paginación se mantiene igual */}
      <Center mt={8} flexDirection="column">
        {/* ... botones ... */}
      </Center>
    </Box>
  )
  
}

export default Home
