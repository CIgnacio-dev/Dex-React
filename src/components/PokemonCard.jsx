import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Tag,
  HStack,
  Skeleton,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";
import { useCompare } from "../context/CompareContext";
import { StarIcon } from "@chakra-ui/icons";
import { useTeam } from "../context/TeamContext";

const typeColorMap = {
  fire: "red",
  water: "blue",
  grass: "green",
  electric: "yellow",
  psychic: "purple",
  ice: "cyan",
  dragon: "orange",
  dark: "gray",
  fairy: "pink",
  normal: "gray",
  fighting: "orange",
  flying: "blue",
  poison: "purple",
  ground: "yellow",
  rock: "yellow",
  bug: "green",
  ghost: "purple",
  steel: "gray",
};

const bgColorMap = {
  fire: "#FECACA",
  water: "#BFDBFE",
  grass: "#BBF7D0",
  electric: "#FEF08A",
  psychic: "#E9D5FF",
  ice: "#CFFAFE",
  dragon: "#FCD34D",
  dark: "#D1D5DB",
  fairy: "#FBCFE8",
  normal: "#F3F4F6",
  fighting: "#FCD34D",
  flying: "#DBEAFE",
  poison: "#E9D5FF",
  ground: "#FEF3C7",
  rock: "#FCD34D",
  bug: "#D9F99D",
  ghost: "#E9D5FF",
  steel: "#E5E7EB",
};

function PokemonCard({ name, url }) {
  const [types, setTypes] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [stats, setStats] = useState({});
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleCompare, isCompared } = useCompare();
  const { addToTeam, team } = useTeam();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          url || `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        const data = await response.json();
        setTypes(data.types.map((t) => t.type.name));
        setImageUrl(
          data.sprites?.other?.["official-artwork"]?.front_default ||
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
  const bgColor = bgColorMap[mainType] || "gray.100";

  if (loading) {
    return (
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="3xl"
        textAlign="center"
        boxShadow="md"
      >
        <Skeleton height="180px" mb={3} />
        <Skeleton height="24px" mb={2} />
        <Skeleton height="36px" />
      </Box>
    );
  }

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      textAlign="center"
      background={
        types.length > 1
          ? `linear-gradient(135deg, ${
              bgColorMap[types[0]] || "gray.100"
            } 50%, ${bgColorMap[types[1]] || "gray.100"} 50%)`
          : bgColorMap[types[0]] || "gray.100"
      }
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "lg",
        cursor: "pointer",
      }}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{ width: "100px", margin: "0 auto" }}
      />

      <HStack justify="center" spacing={2} mt={2}>
        <Text fontWeight="bold">{name.toUpperCase()}</Text>
        <StarIcon
          boxSize={4}
          color={isFavorite(name) ? "yellow.400" : "gray.300"}
          cursor="pointer"
          onClick={() => toggleFavorite(name)}
        />
      </HStack>

      <HStack justify="center" spacing={2} mb={2}>
        {types.map((type, idx) => (
          <Tag
            key={idx}
            colorScheme={typeColorMap[type]}
            border="2px solid"
            borderColor="rgba(0, 0, 0, 0.2)"
            bg="whiteAlpha.800"
            backdropFilter="blur(2px)"
          >
            {type.toUpperCase()}
          </Tag>
        ))}
      </HStack>

      <VStack mt={3} spacing={2}>
        <Button as={Link} to={`/pokemon/${name}`} colorScheme="teal" size="sm">
          Ver más
        </Button>

        <Button
          onClick={() => toggleCompare(name)}
          size="xs"
          colorScheme={isCompared(name) ? "purple" : "gray"}
        >
          {isCompared(name) ? "Comparando" : "Comparar"}
        </Button>

        <Button
          onClick={() => addToTeam({ name, url })}
          size="xs"
          colorScheme={team.find((p) => p.name === name) ? "green" : "blue"}
          isDisabled={team.length >= 6 && !team.find((p) => p.name === name)}
        >
          {team.find((p) => p.name === name)
            ? "En equipo"
            : "Agregar al equipo"}
        </Button>
      </VStack>
    </Box>
  );
}

export default PokemonCard;
