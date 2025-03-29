import { useEffect, useState } from 'react'
import { Box, Text, Button, Tag, HStack, Skeleton } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const typeColorMap = {
  fire: 'red',
  water: 'blue',
  grass: 'green',
  electric: 'yellow',
  psychic: 'purple',
  ice: 'cyan',
  dragon: 'orange',
  dark: 'gray',
  fairy: 'pink',
  normal: 'gray',
  fighting: 'orange',
  flying: 'blue',
  poison: 'purple',
  ground: 'yellow',
  rock: 'yellow',
  bug: 'green',
  ghost: 'purple',
  steel: 'gray',
}

function PokemonCard({ name, url }) {
  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(true)

  const id = url.split('/').filter(Boolean).pop()
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setTypes(data.types.map(t => t.type.name))
        setLoading(false)
      })
  }, [url])

  if (loading) {
    return (
      <Box p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
        <Skeleton height="100px" mb={3} />
        <Skeleton height="20px" mb={2} />
        <HStack justify="center" spacing={2} mb={3}>
          <Skeleton height="24px" width="50px" borderRadius="md" />
          <Skeleton height="24px" width="50px" borderRadius="md" />
        </HStack>
        <Skeleton height="32px" width="80px" mx="auto" />
      </Box>
    )
  }
  

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
      <img src={imageUrl} alt={name} style={{ width: '100px', margin: '0 auto' }} />
      <Text fontWeight="bold" mt={2} mb={2}>{name.toUpperCase()}</Text>

      {/* Tipos */}
      <HStack justify="center" spacing={2} mb={3}>
        {types.map((type, index) => (
          <Tag key={index} colorScheme={typeColorMap[type] || 'gray'}>
            {type.toUpperCase()}
          </Tag>
        ))}
      </HStack>

      <Button as={Link} to={`/pokemon/${name}`} colorScheme="teal" size="sm">
        Ver más
      </Button>
    </Box>
    
  )
}

export default PokemonCard
