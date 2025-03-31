
export const getPokemons = async (limit = 20, offset = 0) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    if (!response.ok) {
      throw new Error('Error al obtener los Pokémon')
    }
    const data = await response.json()
    return data.results
  }
  export const getAllPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010');
    const data = await res.json();
    const results = data.results;
  
    // Cargar por lotes de 50
    const batchSize = 50;
    const detailedData = [];
  
    for (let i = 0; i < results.length; i += batchSize) {
      const batch = results.slice(i, i + batchSize);
      const batchData = await Promise.all(
        batch.map(async (p) => {
          const res = await fetch(p.url);
          const details = await res.json();
          return {
            name: p.name,
            url: p.url,
            types: details.types.map(t => t.type.name),
          };
        })
      );
      detailedData.push(...batchData);
    }
  
    return detailedData;
  };
  
  
  