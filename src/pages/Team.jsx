import { Box, Heading, SimpleGrid, Text, Button, Image, VStack } from '@chakra-ui/react'
import { useTeam } from '../context/TeamContext'
import { Link as RouterLink } from 'react-router-dom'

function Team() {
  const { team, removeFromTeam, clearTeam } = useTeam()

  return (
    <Box p={6}>
      <Heading mb={4}>Mi Equipo Pokémon</Heading>

      {team.length === 0 ? (
        <Text textAlign="center">No has agregado Pokémon aún.</Text>
      ) : (
        <>
          <SimpleGrid columns={[1, 2, 3]} spacing={6} mb={6}>
            {team.map((pokemon) => {
              const id = pokemon.url.split('/').filter(Boolean).pop()
              const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

              return (
                <Box key={pokemon.name} p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
                  <Image src={image} alt={pokemon.name} boxSize="100px" mx="auto" />
                  <Text fontWeight="bold" mt={2}>{pokemon.name.toUpperCase()}</Text>
                  <Button
                    size="sm"
                    colorScheme="red"
                    mt={2}
                    onClick={() => removeFromTeam(pokemon.name)}
                  >
                    Quitar
                  </Button>
                </Box>
              )
            })}
          </SimpleGrid>

          <VStack>
            <Button colorScheme="teal" onClick={clearTeam}>
              Limpiar equipo completo
            </Button>
            <Button as={RouterLink} to="/" variant="link" colorScheme="blue">
              Volver a la Pokédex
            </Button>
          </VStack>
        </>
      )}
    </Box>
  )
}

export default Team
