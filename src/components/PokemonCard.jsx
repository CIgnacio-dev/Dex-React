// src/components/PokemonCard.jsx
import { Box, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function PokemonCard({ name, url }) {
  const id = url.split('/').filter(Boolean).pop()
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
      <img src={imageUrl} alt={name} style={{ width: '100px', margin: '0 auto' }} />
      <Text fontWeight="bold" mt={2} mb={2}>{name.toUpperCase()}</Text>
      <Button as={Link} to={`/pokemon/${name}`} colorScheme="teal" size="sm">
        Ver más
      </Button>
    </Box>
  )
}

export default PokemonCard
