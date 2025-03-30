import { useEffect, useState } from 'react'
import {
  Box,
  Center,
  HStack,
  Button,
  Text,
  Select,
  Skeleton,
} from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

import { getPokemons, getAllPokemons } from '../services/api'
import SearchBar from '../components/SearchBar'
import PokemonGrid from '../components/PokemonGrid'
import Pagination from '../components/Pagination'
import LoadingSkeletons from '../components/LoadingSkeletons'

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page')) || 1
  const limit = 20
  const total = 1010
  const totalPages = Math.ceil(total / limit)
  const offset = (page - 1) * limit

  const [pokemons, setPokemons] = useState([])
  const [allPokemons, setAllPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('name-asc')

  // Cargar todos los Pokémon (para búsqueda + tipos)
  useEffect(() => {
    getAllPokemons().then(data => setAllPokemons(data))
  }, [])

  // Cargar Pokémon por página (cuando no hay búsqueda)
  useEffect(() => {
    setLoading(true)
    getPokemons(limit, offset)
      .then(data => setPokemons(data))
      .finally(() => setLoading(false))
  }, [offset])

  // Aplicar filtros (nombre + tipo)
  const filteredPokemons = (search ? allPokemons : pokemons).filter(p =>
    p.name.includes(search) &&
    (!selectedType || p.types?.includes?.(selectedType))
  )

  const sortedPokemons = [...filteredPokemons].sort((a, b) => {
    const idA = a.url ? parseInt(a.url.split("/").filter(Boolean).pop()) : 0
    const idB = b.url ? parseInt(b.url.split("/").filter(Boolean).pop()) : 0

    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "id-asc":
        return idA - idB
      case "id-desc":
        return idB - idA
      default:
        return 0
    }
  })

  return (
    <Box p={6}>
      {/* Buscador + Filtro por tipo */}
      <Button as={Link} to="/comparar" colorScheme="blue" size="sm">
  Ver comparación
</Button>
      <SearchBar
        search={search}
        onSearch={setSearch}
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      {/* Selector de ordenamiento */}
      <Box maxW="300px" mx="auto" mb={4}>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name-asc">Nombre A → Z</option>
          <option value="name-desc">Nombre Z → A</option>
          <option value="id-asc">ID Ascendente</option>
          <option value="id-desc">ID Descendente</option>
        </Select>
      </Box>

      {/*  Grid de resultados */}
      <Box mt={6}>
        {loading
          ? <LoadingSkeletons count={20} />
          : <PokemonGrid
              pokemons={sortedPokemons}
              loading={false}
              selectedType={selectedType}
            />
        }
      </Box>

      {/*  Paginación  */}
      {!search && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setSearchParams({ page: newPage })}
        />
      )}
    </Box>
  )
}

export default Home
