import { useTheme } from '../../contexts/ThemeContext'
import styles from './theme.module.scss'

export function ThemeSwitcher(){
  const { toggleTheme } = useTheme()

  return (
    <div className={styles.themeSwitcher}>
      <input type="checkbox" id="switch" onClick={toggleTheme}/>
    </div>
  )
}