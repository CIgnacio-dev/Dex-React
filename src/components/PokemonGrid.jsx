import {
    Box,
    SimpleGrid,
    Fade,
    Skeleton
  } from '@chakra-ui/react'
  import PokemonCard from './PokemonCard'
  
  function PokemonGrid({ pokemons, loading, selectedType }) {
    if (loading) {
      return (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {Array.from({ length: 20 }).map((_, i) => (
            <Box key={i} p={4} borderWidth="1px" borderRadius="lg">
              <Skeleton height="100px" mb={2} />
              <Skeleton height="20px" mb={2} />
              <Skeleton height="32px" />
            </Box>
          ))}
        </SimpleGrid>
      )
    }
  
    const filtered = selectedType
      ? pokemons.filter(p => p.types?.includes?.(selectedType))
      : pokemons
  
    return (
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {filtered.map((pokemon, index) => (
          <Fade in key={index}>
            <PokemonCard name={pokemon.name} url={pokemon.url} />
          </Fade>
        ))}
      </SimpleGrid>
    )
  }
  
  export default PokemonGrid
  