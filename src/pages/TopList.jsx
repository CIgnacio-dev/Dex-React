import { useEffect, useState } from 'react'
import {
  Box, Heading, Select, Spinner,
  SimpleGrid, Text, Progress, VStack, Image
} from '@chakra-ui/react'

const STAT_OPTIONS = [
  { label: 'HP', value: 'hp' },
  { label: 'Ataque', value: 'attack' },
  { label: 'Defensa', value: 'defense' },
  { label: 'Ataque Especial', value: 'special-attack' },
  { label: 'Defensa Especial', value: 'special-defense' },
  { label: 'Velocidad', value: 'speed' },
]

function TopList() {
  const [stat, setStat] = useState('hp')
  const [topPokemons, setTopPokemons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1010`)
      const data = await res.json()

      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url)
          const details = await res.json()
          return {
            name: p.name,
            image: details.sprites.other['official-artwork'].front_default,
            stat: details.stats.find(s => s.stat.name === stat)?.base_stat || 0,
          }
        })
      )

      const sorted = detailed
        .sort((a, b) => b.stat - a.stat)
        .slice(0, 10)

      setTopPokemons(sorted)
      setLoading(false)
    }

    fetchAll()
  }, [stat])

  return (
    <Box p={6}>
      <Heading mb={4}>Top 10 Pokémon por {STAT_OPTIONS.find(s => s.value === stat)?.label}</Heading>
      <Select value={stat} onChange={(e) => setStat(e.target.value)} maxW="300px" mb={6}>
        {STAT_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </Select>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {topPokemons.map((p, i) => (
            <Box key={p.name} p={4} borderWidth="1px" borderRadius="lg" bg="gray.50" textAlign="center">
              <Text fontWeight="bold" mb={2}>#{i + 1} {p.name.toUpperCase()}</Text>
              <Image src={p.image} alt={p.name} boxSize="120px" mx="auto" />
              <VStack mt={3}>
                <Text>{STAT_OPTIONS.find(s => s.value === stat)?.label}: {p.stat}</Text>
                <Progress value={p.stat} max={200} colorScheme="teal" width="100%" borderRadius="md" />
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  )
}

export default TopList
