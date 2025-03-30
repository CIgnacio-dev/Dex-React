import { Box, SimpleGrid, Skeleton } from '@chakra-ui/react'

function LoadingSkeletons({ count = 20 }) {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} p={4} borderWidth="1px" borderRadius="lg">
          <Skeleton height="100px" mb={2} />
          <Skeleton height="20px" mb={2} />
          <Skeleton height="32px" />
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default LoadingSkeletons
