
export const getPokemons = async (limit = 20, offset = 0) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    if (!response.ok) {
      throw new Error('Error al obtener los Pokémon')
    }
    const data = await response.json()
    return data.results
  }
  export const getAllPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010')
    const data = await res.json()
    return data.results // [{ name, url }]
  }
  