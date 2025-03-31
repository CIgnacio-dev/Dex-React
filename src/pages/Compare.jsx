import { useCompare } from '../context/CompareContext';
import { Box, Heading, Text, SimpleGrid, VStack, HStack, Tag, Progress, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function Compare() {
  const { compared = [], clearCompared } = useCompare();
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(
        compared.map(async (name) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
          return await res.json();
        })
      );
      setPokemonData(data);
    };

    if (Array.isArray(compared) && compared.length > 0) fetchData();
  }, [compared]);

  if (!Array.isArray(compared) || compared.length === 0) {
    return <Text textAlign="center" mt={10}>No hay Pokémon seleccionados para comparar.</Text>;
  }

  const getStat = (pokemon, statName) =>
    pokemon.stats.find((s) => s.stat.name === statName)?.base_stat;

  const statColor = {
    hp: 'red',
    attack: 'orange',
    defense: 'yellow',
    speed: 'blue',
  };

  const statNames = ['hp', 'attack', 'defense', 'speed'];

  return (
    <Box p={6}>
      <Heading mb={6}>Comparación de Pokémon</Heading>

      <Button mb={6} colorScheme="red" onClick={clearCompared}>
        Quitar todos
      </Button>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {pokemonData.map((pokemon) => (
          <Box
            key={pokemon.name}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            textAlign="center"
            bg="gray.50"
            boxShadow="md"
            _hover={{ boxShadow: 'xl' }}
          >
            <img
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: '120px', margin: '0 auto' }}
            />
            <Text fontWeight="bold" mt={2}>{pokemon.name.toUpperCase()}</Text>
            <HStack justify="center" spacing={2} mt={2} wrap="wrap">
              {pokemon.types.map((t, idx) => (
                <Tag key={idx} colorScheme="teal">{t.type.name.toUpperCase()}</Tag>
              ))}
            </HStack>
            <VStack spacing={3} mt={4} align="stretch">
              {statNames.map((stat) => (
                <Box key={stat} textAlign="left">
                  <Text fontSize="sm" fontWeight="bold">
                    {stat.toUpperCase()}: {getStat(pokemon, stat)}
                  </Text>
                  <Progress
                    value={getStat(pokemon, stat)}
                    max={200}
                    colorScheme={statColor[stat] || 'teal'}
                    borderRadius="md"
                  />
                </Box>
              ))}
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Compare;
