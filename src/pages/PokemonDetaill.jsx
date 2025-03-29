import { useParams, Link as RouterLink } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  Box, Heading, Image, Spinner, Text,
  Center, HStack, Tag, VStack, Link
} from '@chakra-ui/react'

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
  ground: 'brown',
  rock: 'yellow',
  bug: 'green',
  ghost: 'purple',
  steel: 'gray',
}

function PokemonDetail() {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [evolutions, setEvolutions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data)
        setLoading(false)
      })
  }, [name])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      .then(res => res.json())
      .then(species => fetch(species.evolution_chain.url))
      .then(res => res.json())
      .then(data => {
        const evoChain = []
        let current = data.chain
        while (current) {
          evoChain.push(current.species.name)
          current = current.evolves_to[0]
        }
        setEvolutions(evoChain)
      })
  }, [name])

  if (loading || !pokemon) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    
    <Box textAlign="center" p={6}>
      <Heading mb={4}>{pokemon.name.toUpperCase()}</Heading>
      <Button
  as={RouterLink}
  to="/"
  colorScheme="teal"
  size="sm"
  mt={4}
  mb={6}
>
  ← Volver a la Pokédex
</Button>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        mx="auto"
        boxSize="150px"
      />

      {/* Tipos */}
      <HStack justify="center" mt={4} spacing={2}>
        {pokemon.types.map((t, index) => (
          <Tag key={index} colorScheme={typeColorMap[t.type.name] || 'gray'}>
            {t.type.name.toUpperCase()}
          </Tag>
        ))}
      </HStack>

      {/* Info básica */}
      <Text mt={4}>ID: {pokemon.id}</Text>
      <Text>Altura: {pokemon.height}</Text>
      <Text>Peso: {pokemon.weight}</Text>

      {/* Línea evolutiva */}
      <Box mt={8}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Línea evolutiva
        </Text>
        <HStack justify="center" spacing={6}>
          {evolutions.map((evoName, index) => (
            <HStack key={evoName}>
              <VStack spacing={1}>
                <Link as={RouterLink} to={`/pokemon/${evoName}`}>
                  <Image
                    src={`https://img.pokemondb.net/sprites/home/normal/${evoName}.png`}
                    alt={evoName}
                    boxSize="70px"
                    mx="auto"
                  />
                  <Text fontSize="sm">{evoName}</Text>
                </Link>
              </VStack>

              {index < evolutions.length - 1 && (
                <Text fontSize="2xl" fontWeight="bold">→</Text>
              )}
            </HStack>
          ))}
        </HStack>
      </Box>
    </Box>
  )
}

export default PokemonDetail
