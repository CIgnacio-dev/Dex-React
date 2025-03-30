import { useEffect, useState } from 'react';
import { Box, Text, Button, Tag, HStack, Skeleton, Checkbox } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoriteContext';
import { useCompare } from '../context/CompareContext';
import { StarIcon } from '@chakra-ui/icons';

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
};

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
};

function PokemonCard({ name, url }) {
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState({});
  const [imageUrl, setImageUrl] = useState("");
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
          data.sprites?.front_default ||
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
        );
        setStats(
          data.stats.reduce((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat;
            return acc;
          }, {})
        );
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
      <Box p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
        <Skeleton height="100px" mb={3} />
        <Skeleton height="20px" mb={2} />
        <Skeleton height="32px" />
      </Box>
    );
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
      <img
        src={imageUrl}
        alt={name}
        style={{ width: '100px', margin: '0 auto' }}
      />

      <HStack justify="center" spacing={2} mb={2}>
        <Text fontWeight="bold">{name.toUpperCase()}</Text>
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
        <Text fontSize="sm">❤️ HP: {stats.hp}</Text>
        <Text fontSize="sm">⚔️ Atk: {stats.attack} | 🛡 Def: {stats.defense}</Text>
        <Text fontSize="sm">⚡ Vel: {stats.speed}</Text>
      </Box>

      <Checkbox
        isChecked={isCompared(name)}
        onChange={() => toggleCompare(name)}
        mb={2}
        colorScheme="blue"
      >
        Comparar
      </Checkbox>

      <Button as={Link} to={`/pokemon/${name}`} colorScheme="teal" size="sm">
        Ver más
      </Button>
    </Box>
  );
}

export default PokemonCard;
