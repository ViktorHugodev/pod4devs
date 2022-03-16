import format from 'date-fns/format';
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
      <img src="/logo.svg" alt="Logo podcastr" />

      <p>Os melhores podcats para você ouvir</p>

      <span>{currentDate}dd</span>
      <ThemeSwitcher/>
    </header>
  )
}