import { useCompare } from '../context/CompareContext';
import { Box, Heading, Text, SimpleGrid, VStack, HStack, Tag } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function Compare() {
  const { compared } = useCompare();
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
  
    if (compared && compared.length > 0) fetchData();
  }, [compared]);
  
  if (!pokemonData || pokemonData.length === 0) {
    return <Text textAlign="center" mt={10}>No hay Pokémon seleccionados para comparar.</Text>;
  }
  
  
  
  

  if (!compared || compared.length === 0) {
    return <Text textAlign="center" mt={10}>No hay Pokémon seleccionados para comparar.</Text>;
  }
  

  const getStat = (pokemon, statName) =>
    pokemon.stats.find((s) => s.stat.name === statName)?.base_stat;

  const statNames = ['hp', 'attack', 'defense', 'speed'];

  return (
    <Box p={6}>
      <Heading mb={6}>Comparación de Pokémon</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {pokemonData.map((pokemon) => (
          <Box
            key={pokemon.name}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            textAlign="center"
            bg="gray.50"
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: '100px', margin: '0 auto' }}
            />
            <Text fontWeight="bold" mt={2}>{pokemon.name.toUpperCase()}</Text>
            <HStack justify="center" spacing={2} mt={2}>
              {pokemon.types.map((t, idx) => (
                <Tag key={idx} colorScheme="teal">{t.type.name.toUpperCase()}</Tag>
              ))}
            </HStack>
            <VStack spacing={1} mt={3}>
              {statNames.map((stat) => (
                <Text key={stat} fontSize="sm">
                  {stat.toUpperCase()}: {getStat(pokemon, stat)}
                </Text>
              ))}
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Compare;
