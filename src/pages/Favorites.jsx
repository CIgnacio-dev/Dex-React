import { useEffect, useState } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useFavorites } from '../context/FavoriteContext'
import PokemonGrid from '../components/PokemonGrid'
import LoadingSkeletons from '../components/LoadingSkeletons'

function Favorites() {
  const { favorites } = useFavorites()
  const [favoriteData, setFavoriteData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (favorites.length === 0) {
      setFavoriteData([])
      setLoading(false)
      return
    }

    setLoading(true)
    Promise.all(
      favorites.map(name =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .then(res => res.json())
          .then(data => ({
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.name}`,
            types: data.types.map(t => t.type.name),
          }))
      )
    )
      .then(setFavoriteData)
      .finally(() => setLoading(false))
  }, [favorites])

  return (
    <Box p={6}>
      <Heading mb={4}>⭐ Favoritos</Heading>

      {loading ? (
        <LoadingSkeletons count={favorites.length || 10} />
      ) : favorites.length === 0 ? (
        <Text>No tienes Pokémon favoritos todavía.</Text>
      ) : (
        <PokemonGrid pokemons={favoriteData} loading={false} />
      )}
    </Box>
  )
}

export default Favorites
