import { useParams, Link as RouterLink } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import {
  Box,
  Heading,
  Image,
  Spinner,
  Text,
  Center,
  HStack,
  VStack,
  Tag,
  Link,
  Button,
  Flex
} from '@chakra-ui/react'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

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

function PokemonDetail() {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [evolutions, setEvolutions] = useState([])
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const audioRef = useRef(null)

  const playCry = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

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
      .then(species => {
        const entry = species.flavor_text_entries.find(
          (entry) => entry.language.name === 'es'
        )
        setDescription(entry ? entry.flavor_text.replace(/\f/g, ' ') : 'Sin descripción.')
        return fetch(species.evolution_chain.url)
      })
      .then(res => res.json())
      .then(data => {
        const evoChain = []
let current = data.chain

while (current && current.species) {
  const evoName = current.species.name
  const details = current.evolution_details?.[0]
  const minLevel = details?.min_level || null

  evoChain.push({
    name: evoName,
    level: minLevel
  })

  current = current.evolves_to?.[0]
}

setEvolutions(evoChain)

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

  const mainType = pokemon.types[0]?.type.name
  const bgColor = bgColorMap[mainType] || 'gray.50'
  const radarData = {
    labels: ['HP', 'ATK', 'DEF', 'AT. ESP', 'DEF. ESP', 'VEL'],
    datasets: [
      {
        label: 'Stats Base',
        data: pokemon.stats.map(s => s.base_stat),
        backgroundColor: 'rgba(72, 187, 120, 0.2)',
        borderColor: 'rgba(72, 187, 120, 1)',
        borderWidth: 2
      }
    ]
  }
  
  const radarOptions = {
    scales: {
      r: {
        suggestedMin: 20,
        suggestedMax: 150,
        ticks: {
          stepSize: 20
        }
      }
    }
  }
  
  return (
    <Box p={6} bg={bgColor} minH="100vh" textAlign="center">
      <Button
        as={RouterLink}
        to="/"
        colorScheme="teal"
        size="sm"
        mb={6}
      >
        ← Volver a la Pokédex
      </Button>

      <Flex
  direction={['column', 'column', 'row']} // column en mobile y tablets, row en desktop
  wrap="wrap"
  mt={6}
  align="center"
  justify="center"
  gap={[6, 8, 12]} 
>
  {/*  Sección izquierda - Datos  */}
  <Box
    flex="1"
    minW={['100%', '100%', '300px']}
    textAlign="center"
  >
    <Heading mb={4}>{pokemon.name.toUpperCase()}</Heading>

    <Image
      src={pokemon.sprites.front_default}
      alt={pokemon.name}
      mx="auto"
      boxSize={['120px', '150px', '180px']}
    />

    <HStack justify="center" mt={4} spacing={2} wrap="wrap">
      {pokemon.types.map((t, index) => (
        <Tag key={index} colorScheme={typeColorMap[t.type.name] || 'gray'}>
          {t.type.name.toUpperCase()}
        </Tag>
      ))}
    </HStack>

    <Button onClick={playCry} colorScheme="purple" size="sm" mt={4}>
      🔊 Escuchar sonido
    </Button>

    <Text mt={4}>ID: {pokemon.id}</Text>
    <Text>Altura: {pokemon.height}</Text>
    <Text>Peso: {pokemon.weight}</Text>
  </Box>

  {/* Sección derecha - Gráfico */}
  <Box
    flex="1"
    maxW={['100%', '400px']}
    w="100%"
    textAlign="center"
  >
    <Heading size="md" mb={4}>Estadísticas</Heading>
    <Radar data={radarData} options={radarOptions} />
  </Box>
</Flex>




      {/* Línea evolutiva */}
      <Box mt={8}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Línea evolutiva
        </Text>
        <HStack justify="center" spacing={6}>
        {evolutions.map((evo, index) => (
  <HStack key={evo.name}>
    <VStack spacing={1}>
      <Link as={RouterLink} to={`/pokemon/${evo.name}`}>
        <Image
          src={`https://img.pokemondb.net/sprites/home/normal/${evo.name}.png`}
          alt={evo.name}
          boxSize="70px"
          mx="auto"
        />
        <Text fontSize="sm">{evo.name}</Text>
      </Link>
    </VStack>

    {index < evolutions.length - 1 && (
      <VStack spacing={0}>
        <Text fontSize="xs" fontWeight="medium" color="gray.600">
          {evolutions[index + 1]?.level ? `Nivel ${evolutions[index + 1].level}` : '→'}
        </Text>
        <Text fontSize="2xl" fontWeight="bold">→</Text>
      </VStack>
    )}
  </HStack>
))}

        </HStack>
      </Box>
    </Box>
  )
}

export default PokemonDetail
