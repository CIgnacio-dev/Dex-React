import { HStack, Button, Select, Text, Center } from '@chakra-ui/react'

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <Center mt={8} flexDirection="column">
      <HStack spacing={4}>
        <Button
          onClick={() => onPageChange(page - 1)}
          isDisabled={page === 1}
          colorScheme="teal"
          variant="outline"
        >
          ← Anterior
        </Button>

        <Select
          width="100px"
          value={page}
          onChange={(e) => onPageChange(Number(e.target.value))}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Página {i + 1}
            </option>
          ))}
        </Select>

        <Button
          onClick={() => onPageChange(page + 1)}
          isDisabled={page >= totalPages}
          colorScheme="teal"
        >
          Siguiente →
        </Button>
      </HStack>

      <Text mt={2}>Página {page} de {totalPages}</Text>
    </Center>
  )
}

export default Pagination
