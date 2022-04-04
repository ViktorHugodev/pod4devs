import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import styles from './styles.module.scss'

export function Header() {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    month:'short',
    weekday:'short',
    day:'2-digit',
  })
  return (
    <header className={styles.headerContainer}>
      <img src="/pod4devs.svg" alt="Logo podcastr" />

      <p>Os melhores podcats para você ouvir</p>

      <span>{currentDate}</span>
      <ThemeSwitcher/>
    </header>
  )
}