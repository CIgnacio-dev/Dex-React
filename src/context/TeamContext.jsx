import { createContext, useContext, useState, useEffect } from 'react';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('pokemonTeam');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pokemonTeam', JSON.stringify(team));
  }, [team]);

  const addToTeam = (pokemon) => {
    if (team.length >= 6 || team.some(p => p.name === pokemon.name)) return;
    setTeam(prev => [...prev, pokemon]);
  };

  const removeFromTeam = (name) => {
    setTeam(prev => prev.filter(p => p.name !== name));
  };

  const clearTeam = () => setTeam([]);

  return (
    <TeamContext.Provider value={{ team, addToTeam, removeFromTeam, clearTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);
