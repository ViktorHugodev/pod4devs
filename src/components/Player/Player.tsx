import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";
import { useRef } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { convertSecondInHourMinute } from "../../utils/convertHourMinute";

export function Player() {
  const {
    listEpisodes,
    episodeList,
    handleShuffling,
    isShuffling,
    currentEpisodeIndex,
    isPlaying,
    handleTogglePlayPause,
    handlePlayNext,
    hasNext,
    hasPrevius,
    handleToggleLooping,
    handlePlayPrevius,
    isLooping,
    setStatePlaying,
  } = useContext(PlayerContext);
  const episode = listEpisodes[currentEpisodeIndex];
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const[showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener("timeupdate", () => {
      setProgress(audioRef.current.currentTime);
    });
  }
  function handleTimeChange(amount: number){
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  return (
    <div className={ showPlayer ? `${styles.playerContainer} ${styles.active}` : styles.playerContainer}>
      <button className={styles.showPlayerButton} onClick={() => {setShowPlayer(!showPlayer)}}>
       
          <img src="/playing.svg" alt=" Tocando agora"/>
        
      </button>
      <header>
        <img src="/playing.svg" alt="Tocando aogra" />
        <strong>Tocando agora </strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            src={episode.thumbnail}
            alt={episode.title}
            width={592}
            height={592}
            objectFit={"cover"}
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione o podcast para ouvir</strong>
        </div>
      )}
      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>{convertSecondInHourMinute(Math.floor(progress))}</span>
          <div className={styles.slider}>
            {episode ? (

              <Slider
                onChange={handleTimeChange}
                value={progress}
                max={episode.duration}
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ backgroundColor: "#04d361", borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{convertSecondInHourMinute(episode?.duration || 0)}</span>

          {episode && (
            <audio
              loop={isLooping}
              onPlay={() => setStatePlaying(true)}
              onPause={() => setStatePlaying(false)}
              ref={audioRef}
              onLoadedMetadata={setupProgressListener}
              autoPlay
              onEnded={handlePlayNext}
              src={episode.url}
            ></audio>
          )}
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            disabled={!episode || episodeList.length === 1}
            className={isShuffling ? styles.isActive : ""}
            onClick={handleShuffling}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button
            type="button"
            disabled={!episode || !hasPrevius}
            onClick={handlePlayPrevius}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            onClick={handleTogglePlayPause}
            className={styles.playButton}
            type="button"
            disabled={!episode}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>
          <button
            type="button"
            disabled={!episode || !hasNext}
            onClick={handlePlayNext}
          >
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button
            type="button"
            disabled={!episode}
            className={isLooping ? styles.isActive : ""}
            onClick={handleToggleLooping}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
