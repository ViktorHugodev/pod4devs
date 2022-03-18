import {createContext,  ReactNode,  useContext, useState} from 'react'

interface ThemeContextData {
  theme:string
  toggleTheme: () => void
}

interface ThemeContextDataProvider {
  children: ReactNode
}
export const ThemeContext = createContext({} as ThemeContextData)

export function ThemeContextProvider({children}: ThemeContextDataProvider){

  const [theme, setTheme] = useState('light')
  function toggleTheme(){
    theme == 'light' ? setTheme('dark') : setTheme('light')
    document.documentElement.className = theme
  }
  
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(){
  return useContext(ThemeContext)
}