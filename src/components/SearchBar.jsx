import { Box, Input, Select, VStack } from '@chakra-ui/react'

function SearchBar({ search, onSearch, selectedType, onSelectType, sortMode, onSortModeChange, selectedGen, onGenChange }) {
  return (
    <VStack spacing={3} mb={6}>
      <Input
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={(e) => onSearch(e.target.value.toLowerCase())}
        maxW="300px"
      />

<Select
  placeholder="Filtrar por tipo"
  value={selectedType}
  onChange={(e) => onSelectType(e.target.value)}
  maxW="300px"
>
  <option value="normal">Normal</option>
  <option value="fire">Fuego</option>
  <option value="water">Agua</option>
  <option value="electric">Eléctrico</option>
  <option value="grass">Planta</option>
  <option value="ice">Hielo</option>
  <option value="fighting">Lucha</option>
  <option value="poison">Veneno</option>
  <option value="ground">Tierra</option>
  <option value="flying">Volador</option>
  <option value="psychic">Psíquico</option>
  <option value="bug">Bicho</option>
  <option value="rock">Roca</option>
  <option value="ghost">Fantasma</option>
  <option value="dragon">Dragón</option>
  <option value="dark">Siniestro</option>
  <option value="steel">Acero</option>
  <option value="fairy">Hada</option>
</Select>


      <Select placeholder="Ordenar por..." value={sortMode} onChange={(e) => onSortModeChange(e.target.value)} maxW="300px">
        <option value="default">Predeterminado</option>
        <option value="generation">Generación</option>
      </Select>

      {sortMode === 'generation' && (
        <Select placeholder="Seleccionar generación" value={selectedGen} onChange={(e) => onGenChange(e.target.value)} maxW="300px">
          <option value="1">Primera generación</option>
          <option value="2">Segunda generación</option>
          <option value="3">Tercera generación</option>
          <option value="4">Cuarta generación</option>
          <option value="5">Quinta generación</option>
          <option value="6">Sexta generación</option>
          <option value="7">Séptima generación</option>
          <option value="8">Octava generación</option>
          <option value="9">Novena generación</option>
        </Select>
      )}
    </VStack>
  )
}

export default SearchBar
