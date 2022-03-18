import Switch from 'react-switch'
import { useTheme } from '../../contexts/ThemeContext'
import styles from './theme.module.scss'
export function ThemeSwitcher(){
  const { toggleTheme, theme } = useTheme()

  return (
    <div className={styles.themeSwitcher}>
    <Switch
        onChange={toggleTheme}
        checked={theme === 'dark' ? true : false}
        className={styles.switch}
        checkedIcon={<div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 16,
            color: '#3333'
          }}
        >
          🌜
        </div>}
        uncheckedIcon={<div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 16,
          }}
        >
          🌞
        </div>}
 
        onColor='#282a36'
        boxShadow="0px 1px 3px #bd93f9"
        activeBoxShadow="0px 0px 1px 10px #bd93f9"
      >
      </Switch>
    </div>
  )
}