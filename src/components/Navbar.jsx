import { Box, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box bg="gray.100" p={4} mb={4} boxShadow="sm">
      <HStack spacing={4}>
        <Button as={Link} to="/" colorScheme="teal" variant="ghost">
          Inicio
        </Button>
        <Button as={Link} to="/favoritos" colorScheme="teal" variant="ghost">
          Favoritos
        </Button>
        <Button as={Link} to="/comparar" colorScheme="teal" variant="ghost">
          Comparar
        </Button>
      </HStack>
    </Box>
  );
}

export default Navbar;
