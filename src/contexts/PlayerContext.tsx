import { createContext, useState, ReactNode, SetStateAction } from "react";

interface Episode {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

interface PlayerContextData {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  setListEpisodes: any;
  listEpisodes: Episode[];
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  playEpisodeId: string;
  setPlayEpisodeId: any;
  hasPrevius: boolean;
  setStatePlaying: (state: boolean) => void;
  handleTogglePlayPause: () => void;
  handleToggleLooping: () => void;
  play: (episode: Episode) => void;
  playList: (index: number) => void;
  handlePlayPrevius: () => void;
  handlePlayNext: () => void;
  handleShuffling: () => void;
}

interface PlayerContextProviderProps {
  children: ReactNode;
}
export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [playEpisodeId, setPlayEpisodeId] = useState<string>("");
  const [listEpisodes, setListEpisodes] = useState([]);

  function play(thisEpisode: Episode){
    setListEpisodes([thisEpisode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function handleTogglePlayPause() {
    setIsPlaying(!isPlaying);
  }

  function setStatePlaying(state: boolean) {
    setIsPlaying(state);
  }

  function playList(index: number) {
    setEpisodeList(listEpisodes);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }
  const hasPrevius = currentEpisodeIndex > 0;
  const hasNext = currentEpisodeIndex + 1 < episodeList.length;
  function handlePlayPrevius() {
    if (hasPrevius) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }
  function handlePlayNext() {
    if (isShuffling) {
      const randomEpisode = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(randomEpisode);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function handleToggleLooping() {
    setIsLooping(!isLooping);
  }

  function handleShuffling() {
    setIsShuffling(!isShuffling);
  }

  return (
    <PlayerContext.Provider
      value={{
        listEpisodes,
        setListEpisodes,
        playEpisodeId,
        setPlayEpisodeId,
        handleShuffling,
        isShuffling,
        isLooping,
        handleToggleLooping,
        episodeList,
        handlePlayNext,
        playList,
        handlePlayPrevius,
        currentEpisodeIndex,
        isPlaying,
        play,
        handleTogglePlayPause,
        setStatePlaying,
        hasNext,
        hasPrevius,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
