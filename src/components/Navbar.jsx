import {
  Box,
  Flex,
  Heading,
  Button,
  IconButton,
  Stack,
  Collapse,
  useDisclosure
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

function Navbar() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box bg="white" boxShadow="sm" px={6} py={4} position="sticky" top="0" zIndex="100">
      <Flex
        align="center"
        justify="space-between"
        maxW="1200px"
        mx="auto"
        wrap="wrap"
      >
        {/* Logo y Hamburguesa */}
        <Flex align="center" w={{ base: "100%", md: "auto" }} justify="space-between">
          <Heading size="md" color="teal.600">
            DexReact
          </Heading>
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>

        {/* Menú siempre visible en desktop, colapsable en mobile */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          align={{ base: 'start', md: 'center' }}
          mt={{ base: 4, md: 0 }}
          display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
          w={{ base: "100%", md: "auto" }}
        >
          <Button as={Link} to="/" variant="ghost" colorScheme="teal">
            Inicio
          </Button>
          <Button as={Link} to="/favoritos" variant="ghost" colorScheme="teal">
            Favoritos
          </Button>
          <Button as={Link} to="/comparar" variant="ghost" colorScheme="teal">
            Comparar
          </Button>
          <Button as={Link} to="/top" variant="ghost" colorScheme="teal">
            Top List 👑
          </Button>
          <Button as={Link} to="/equipo" variant="ghost" colorScheme="blue">
            Mi Equipo
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}

export default Navbar
