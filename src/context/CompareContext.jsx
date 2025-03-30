import { createContext, useContext, useEffect, useState } from 'react'

const CompareContext = createContext()

export function CompareProvider({ children }) {
  const [selected, setSelected] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('compare')) || []
    setSelected(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(selected))
  }, [selected])

  const toggleCompare = (name) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    )
  }

  const isCompared = (name) => selected.includes(name)

  const clearCompare = () => setSelected([])

  return (
    <CompareContext.Provider
      value={{ selected, toggleCompare, isCompared, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  return useContext(CompareContext)
}
