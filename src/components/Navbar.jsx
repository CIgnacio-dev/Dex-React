import { Box, Flex, Heading, Spacer, Button, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <Box bg="white" boxShadow="sm" px={6} py={4} position="sticky" top="0" zIndex="100">
      <Flex align="center" maxW="1200px" mx="auto">
        <Heading size="md" color="teal.600">
          DexReact
        </Heading>
        <Spacer />
        <HStack spacing={4}>
          <Button as={Link} to="/" variant="ghost" colorScheme="teal">Inicio</Button>
          <Button as={Link} to="/favoritos" variant="ghost" colorScheme="teal">Favoritos</Button>
          <Button as={Link} to="/comparar" variant="ghost" colorScheme="teal">Comparar</Button>
          <Button as={Link} to="/top" variant="ghost" colorScheme="teal">Top List👑</Button>
          <Button as={Link} to="/equipo" variant="ghost" colorScheme="blue">Mi Equipo</Button>

        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar
