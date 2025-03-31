import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPokemons, getAllPokemons } from '../services/api';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { Box, SimpleGrid, Skeleton, Center, HStack, Button, Text, Select, Fade } from '@chakra-ui/react';

const generationRanges = {
  1: [1, 151],
  2: [152, 251],
  3: [252, 386],
  4: [387, 493],
  5: [494, 649],
  6: [650, 721],
  7: [722, 809],
  8: [810, 905],
  9: [906, 1010],
};

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortMode, setSortMode] = useState('');
  const [selectedGen, setSelectedGen] = useState('');

  const limit = sortMode === 'generation' && selectedGen ? 200 : 20;
  const total = 1010;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;

  useEffect(() => {
    getAllPokemons().then(data => setAllPokemons(data));
  }, []);

  useEffect(() => {
    setLoading(true);

    if (sortMode === 'generation' && selectedGen) {
      const [min, max] = generationRanges[selectedGen];
      const filtered = allPokemons.filter(p => {
        const id = parseInt(p.url.split('/').filter(Boolean).pop());
        return id >= min && id <= max;
      });
      setPokemons(filtered);
      setLoading(false);
    } else {
      getPokemons(limit, offset)
        .then(data => setPokemons(data))
        .finally(() => setLoading(false));
    }
  }, [offset, sortMode, selectedGen, allPokemons]);

  let visiblePokemons = pokemons;

  if (search) {
    visiblePokemons = visiblePokemons.filter(p => p.name.includes(search));
  }

  if (selectedType) {
    const dataToFilter = sortMode === 'generation' && selectedGen ? pokemons : allPokemons;
    visiblePokemons = dataToFilter.filter(p => p.types?.includes(selectedType));
  }
  

  if (loading) {
    return (
      <Box p={6}>
        <Skeleton height="40px" mb={4} maxW="300px" mx="auto" />
        <Skeleton height="40px" mb={6} maxW="300px" mx="auto" />
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {Array.from({ length: 20 }).map((_, i) => (
            <Box key={i} p={4} borderWidth="1px" borderRadius="lg">
              <Skeleton height="100px" mb={2} />
              <Skeleton height="20px" mb={2} />
              <Skeleton height="32px" />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <SearchBar
        search={search}
        onSearch={setSearch}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        sortMode={sortMode}
        onSortModeChange={setSortMode}
        selectedGen={selectedGen}
        onGenChange={setSelectedGen}
      />

      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {visiblePokemons.map((pokemon, index) => (
          <Fade in={!loading} key={index}>
            <PokemonCard name={pokemon.name} url={pokemon.url} />
          </Fade>
        ))}
      </SimpleGrid>

      {!(sortMode === 'generation' && selectedGen) && (
        <Center mt={8} flexDirection="column">
          <HStack spacing={4}>
            <Button
              onClick={() => setSearchParams({ page: page - 1 })}
              isDisabled={page === 1}
              colorScheme="teal"
              variant="outline"
            >
              ← Anterior
            </Button>

            <Select
              width="100px"
              value={page}
              onChange={(e) => setSearchParams({ page: e.target.value })}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Página {i + 1}
                </option>
              ))}
            </Select>

            <Button
              onClick={() => setSearchParams({ page: page + 1 })}
              isDisabled={page >= totalPages}
              colorScheme="teal"
            >
              Siguiente →
            </Button>
          </HStack>

          <Text mt={2}>Página {page} de {totalPages}</Text>
        </Center>
      )}
    </Box>
  );
}

export default Home;
