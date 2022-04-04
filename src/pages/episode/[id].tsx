import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { api } from "../../services/api";
import { convertSecondInHourMinute } from "../../utils/convertHourMinute";

import styles from "./episode.module.scss";
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

export default function Episode({ episode }: Episode) {
  const {handlePlay, playList} = useContext(PlayerContext)
  console.log(episode)
  return (
    <div className={styles.episode}>
       <Head>
        <title>Podcastr</title>
      </Head>
      <div className={styles.thumbnail}>
        <Link href="/">
          <button>
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          src={episode.thumbnail}
          width={700}
          height={260}
          alt={episode.title}
          objectFit="cover"
        />
        <button onClick={() => handlePlay(episode)}>
          <img src="/play-green.svg" alt="Tocar música" />
        </button>
      </div>
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("/", {
    params: {
      _limit: 2,
      _sort: "published_at",
      _order: "desc",
    },
  });
  const paths = data.episodes.map(episode => {
    return {
      params: {
        id: episode.id
      }
    }
  })
  console.log('path', paths)
  console.log('data', data)
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async (context) => {

  const { id } = context.params;

  const { data } = await api.get(`/`);

  const episodeInfo = data.episodes.filter(episode => {
    if(episode.id === id) {
      
      return {
        id: episode.id,
        title: episode.title,
        members: episode.members,
        publishedAt: new Date(episode.published_at).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "2-digit",
        }),
        thumbnail: episode.thumbnail,
        description: episode.description,
        url: episode.file.url,
        durationString: convertSecondInHourMinute(Number(episode.file.duration)),
        duration: episode.file.duration
      }
  
    }
  } )

  return {
    props: {
      episode: episodeInfo[0]
    },
    revalidate: 60 * 60 * 24,
  };
};
