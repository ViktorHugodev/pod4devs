import Image from "next/image";
import Link from "next/link";

import { useContext, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import styles from './listitem.module.scss';

export function ListItem({episode,  index}) {
  const { playList, isPlaying, handleTogglePlayPause, currentEpisodeIndex} = useContext(PlayerContext)

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
   

      <button
          type="button"
          onClick={() => {
            if (isPlaying && index === currentEpisodeIndex) {
              handleTogglePlayPause();
            } else {
              playList(index);
            }
          }}
        >
          {isPlaying && index === currentEpisodeIndex ? (
            <img src="/pause-green.svg" alt="Pausar episódio" />
          ) : (
            <img src="/play-green.svg" alt="Tocar episódio" />
          )}
        </button>
    </div>
  </div>
  );
}
