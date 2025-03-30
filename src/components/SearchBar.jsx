import {
    Box,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
  } from '@chakra-ui/react'
  
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
  
  const pokemonTypes = Object.keys(typeColorMap)
  
  function SearchBar({ search, onSearch, selectedType, onSelectType }) {
    return (
      <Box maxW="300px" mx="auto">
        <Input
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => onSearch(e.target.value.toLowerCase())}
          mb={3}
        />
  
        <Menu>
          <MenuButton
            as={Button}
            colorScheme={selectedType ? typeColorMap[selectedType] : 'teal'}
            mt={3}
            w="100%"
          >
            {selectedType ? `Tipo: ${selectedType.toUpperCase()}` : 'Filtrar por tipo'}
          </MenuButton>
          <MenuList>
            {pokemonTypes.map((type) => (
              <MenuItem
                key={type}
                bg={typeColorMap[type] + '.400'}
                color="white"
                _hover={{ bg: typeColorMap[type] + '.500' }}
                onClick={() => onSelectType(type)}
              >
                {type.toUpperCase()}
              </MenuItem>
            ))}
            <MenuItem onClick={() => onSelectType('')}>
              Limpiar filtro
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    )
  }
  
  export default SearchBar
  