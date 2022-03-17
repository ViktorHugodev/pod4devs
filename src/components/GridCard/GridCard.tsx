import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./gridcard.module.scss";
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
interface GridCard {
  episode: EpisodesProps;
  episodeList: EpisodesProps[];
  index: number;
}

export function GridCard({ episode, episodeList, index }: GridCard) {
  const { playList } = useContext(PlayerContext);
  return (
    <div className={styles.cardContent}>
      <div className={styles.image}>
        <Image
          src={episode?.thumbnail}
          width={150}
          height={80}
          alt={episode?.title}
          objectFit="cover"
        />
      </div>
      <div className={styles.info}>
        <Link href={`/episode/${episode.id}`}>
          <a>{episode?.title}</a>
        </Link>
        <p>{episode?.members}</p>
        <span>{episode.publishedAt} - {episode.durationString}m</span>
     

        <button type="button" onClick={() => playList(episodeList, index)}>
          <img src="/play-green.svg" alt="Tocar música" />
        </button>
      </div>
    </div>
  );
}
