import { useEffect, useState } from 'react'
import {
  Box,
  Text,
  Button,
  Tag,
  HStack,
  Skeleton
} from '@chakra-ui/react'
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

const bgColorMap = {
  fire: 'red.100',
  water: 'blue.100',
  grass: 'green.100',
  electric: 'yellow.100',
  psychic: 'purple.100',
  ice: 'cyan.100',
  dragon: 'orange.100',
  dark: 'gray.200',
  fairy: 'pink.100',
  normal: 'gray.100',
  fighting: 'orange.200',
  flying: 'blue.50',
  poison: 'purple.100',
  ground: 'yellow.200',
  rock: 'yellow.300',
  bug: 'green.200',
  ghost: 'purple.200',
  steel: 'gray.300',
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

  const mainType = types[0]
  const bgColor = bgColorMap[mainType] || 'gray.50'

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
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      textAlign="center"
      transition="all 0.2s"
      bg={bgColor}
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: 'lg',
        cursor: 'pointer',
      }}
    >
      <img src={imageUrl} alt={name} style={{ width: '100px', margin: '0 auto' }} />
      <Text fontWeight="bold" mt={2} mb={2}>{name.toUpperCase()}</Text>

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
