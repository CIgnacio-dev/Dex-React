import { createContext, useContext, useState, useEffect } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compared, setCompared] = useState([]);

  const toggleCompare = (name) => {
    setCompared((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const clearCompared = () => setCompared([]);

  const isCompared = (name) => compared.includes(name);

  return (
    <CompareContext.Provider value={{ compared, toggleCompare, clearCompared, isCompared }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
