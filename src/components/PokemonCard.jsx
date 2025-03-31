import { useEffect, useState } from 'react';
import { Box, Text, Button, Tag, HStack, Skeleton, Checkbox, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoriteContext';
import { useCompare } from '../context/CompareContext';
import { StarIcon } from '@chakra-ui/icons';

const typeColorMap = {
  fire: 'red', water: 'blue', grass: 'green', electric: 'yellow',
  psychic: 'purple', ice: 'cyan', dragon: 'orange', dark: 'gray',
  fairy: 'pink', normal: 'gray', fighting: 'orange', flying: 'blue',
  poison: 'purple', ground: 'yellow', rock: 'yellow', bug: 'green',
  ghost: 'purple', steel: 'gray',
};

const bgColorMap = {
  fire: 'red.100', water: 'blue.100', grass: 'green.100', electric: 'yellow.100',
  psychic: 'purple.100', ice: 'cyan.100', dragon: 'orange.100', dark: 'gray.200',
  fairy: 'pink.100', normal: 'gray.100', fighting: 'orange.200', flying: 'blue.50',
  poison: 'purple.100', ground: 'yellow.200', rock: 'yellow.300', bug: 'green.200',
  ghost: 'purple.200', steel: 'gray.300',
};

function PokemonCard({ name, url }) {
  const [types, setTypes] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [stats, setStats] = useState({});
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleCompare, isCompared } = useCompare();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          url || `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        const data = await response.json();
        setTypes(data.types.map((t) => t.type.name));
        setImageUrl(
          data.sprites?.other?.['official-artwork']?.front_default ||
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
        );
        setStats({
          hp: data.stats.find((s) => s.stat.name === "hp")?.base_stat,
          attack: data.stats.find((s) => s.stat.name === "attack")?.base_stat,
          defense: data.stats.find((s) => s.stat.name === "defense")?.base_stat,
          speed: data.stats.find((s) => s.stat.name === "speed")?.base_stat,
        });
        setId(data.id);
      } catch (error) {
        console.error("Error al cargar datos del Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, name]);

  const mainType = types[0];
  const bgColor = bgColorMap[mainType] || 'gray.50';

  if (loading) {
    return (
      <Box p={6} borderWidth="1px" borderRadius="3xl" textAlign="center" boxShadow="md">
        <Skeleton height="180px" mb={3} />
        <Skeleton height="24px" mb={2} />
        <Skeleton height="36px" />
      </Box>
    );
  }

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="3xl"
      textAlign="center"
      bgGradient={`linear(to-b, ${bgColor}, white)`}
      boxShadow="xl"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{ transform: 'scale(1.05)', boxShadow: '2xl' }}
    >
      <Text fontSize="sm" color="gray.600" fontWeight="bold">
        #{id?.toString().padStart(4, '0')}
      </Text>

      <img
        src={imageUrl}
        alt={name}
        style={{ width: '180px', margin: '0 auto' }}
      />

      <HStack justify="center" spacing={2} mt={3} mb={2}>
        <Text fontWeight="bold" fontSize="lg">{name.toUpperCase()}</Text>
        <StarIcon
          boxSize={4}
          color={isFavorite(name) ? 'yellow.400' : 'gray.300'}
          cursor="pointer"
          onClick={() => toggleFavorite(name)}
        />
      </HStack>

      <HStack justify="center" spacing={2} mb={3}>
        {types.map((type, index) => (
          <Tag key={index} colorScheme={typeColorMap[type] || 'gray'}>
            {type.toUpperCase()}
          </Tag>
        ))}
      </HStack>

      <Box mt={2} mb={2}>
        <Text fontSize="sm">❤️ {stats.hp}</Text>
        <HStack justify="center" spacing={3}>
          <Text fontSize="sm">⚔️ {stats.attack}</Text>
          <Text fontSize="sm">🛡 {stats.defense}</Text>
        </HStack>
        <Text fontSize="sm">⚡ {stats.speed}</Text>
      </Box>

      <VStack spacing={2} mt={3}>
        <Checkbox
          isChecked={isCompared(name)}
          onChange={() => toggleCompare(name)}
          colorScheme="blue"
        >
          Comparar
        </Checkbox>

        <Button as={Link} to={`/pokemon/${name}`} colorScheme="teal" size="sm">
          Ver más
        </Button>
      </VStack>
    </Box>
  );
}

export default PokemonCard;
