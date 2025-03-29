import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Box,
  SimpleGrid,
  Spinner,
  Center,
  HStack,
  Button,
  Text,
  Select,
  Skeleton,
  Fade
} from '@chakra-ui/react'
import { getPokemons, getAllPokemons } from '../services/api'
import PokemonCard from '../components/PokemonCard'

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page')) || 1

  const limit = 20
  const total = 1010
  const totalPages = Math.ceil(total / limit)
  const offset = (page - 1) * limit

  const [pokemons, setPokemons] = useState([])
  const [allPokemons, setAllPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getAllPokemons().then(data => setAllPokemons(data))
  }, [])


  useEffect(() => {
    setLoading(true)
    getPokemons(limit, offset)
      .then(data => setPokemons(data))
      .finally(() => setLoading(false))
  }, [offset])


  if (loading) {
    return (
      <Box p={6}>
        <Skeleton height="40px" mb={6} maxW="300px" mx="auto" />
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
      {/*  Barra de búsqueda */}
      <Box maxW="300px" mx="auto" mb={6}>
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

       
      {search ? (
        <>
          <Text mb={4} fontWeight="bold">Resultados de búsqueda:</Text>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {allPokemons
              .filter(p => p.name.includes(search))
              .slice(0, 20) // Limitar a 20 resultados
              .map((pokemon, index) => (
                <Fade in key={index}>
                  <PokemonCard name={pokemon.name} url={pokemon.url} />
                </Fade>
              ))}
          </SimpleGrid>
        </>
      ) : (
        <>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {pokemons.map((pokemon, index) => (
              <Fade in key={index}>
                <PokemonCard name={pokemon.name} url={pokemon.url} />
              </Fade>
            ))}
          </SimpleGrid>

            
          <Center mt={8} flexDirection="column">
            <HStack spacing={4}>
              <Button
                onClick={() => setSearchParams({ page: page - 1 })}
                isDisabled={page === 1}
                colorScheme="teal"
                variant="outline"
              >
                ← Anterior
              </Button>

              <Select
                width="100px"
                value={page}
                onChange={(e) =>
                  setSearchParams({ page: e.target.value })
                }
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Página {i + 1}
                  </option>
                ))}
              </Select>

              <Button
                onClick={() => setSearchParams({ page: page + 1 })}
                isDisabled={page >= totalPages}
                colorScheme="teal"
              >
                Siguiente →
              </Button>
            </HStack>

            <Text mt={2}>Página {page} de {totalPages}</Text>
          </Center>
        </>
      )}
    </Box>
  )
}

export default Home
