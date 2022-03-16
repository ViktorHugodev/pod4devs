import Image from 'next/image'
import styles from './gridcard.module.scss'
interface EpisodesProps {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  durationString: string;
  url: string;
  duration: number;
}
interface Episode {
  episode: EpisodesProps;
}

export function GridCard({episode}: any){
  console.log(episode)
  return (
    <div className={styles.cardContent}>
      <div>
        <Image
        src={episode?.thumbnail}
        width={150}
        height={80}
        alt={episode?.title}
        objectFit="cover"

        />
      </div>
      <div className={styles.info}>
        <strong>{episode?.title}</strong>
        <span>{episode?.members}</span>
      </div>
    </div>
  )
}