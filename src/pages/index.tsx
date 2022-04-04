import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { GridCard } from "../components/GridCard/GridCard";
import { ListItem } from "../components/ListItem/ListItem";
import { PlayerContext } from "../contexts/PlayerContext";
import { api } from "../services/api";
import styles from "../styles/homepage.module.scss";
import { convertSecondInHourMinute } from "../utils/convertHourMinute";
interface EpisodesProps {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  duration: number;
  url: string;
  durationString: string;
}
interface Episodes {
  lastEpisodes: EpisodesProps[];
  allEpisodes: EpisodesProps[];
}

export default function Home({ lastEpisodes, allEpisodes }: Episodes) {
  const episodeList = [...lastEpisodes, ...allEpisodes];

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Pod4Devs</title>
      </Head>
      <section>
        <h2>Adicionados recentemente</h2>
        <div className={styles.gridContainer}>
          {lastEpisodes.map((episode, index) => {
            return (
              <GridCard
                key={episode.id}
                episode={episode}
                episodeList={episodeList}
                index={index}
              />
            );
          })}
        </div>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos os episódios</h2>
        <ul>
          {allEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <ListItem
                  key={episode.id}
                  episode={episode}
                  episodeList={episodeList}
                  index={index}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });
  // const {data} = await api.get('')

  const episodesArray = data.map((episode) => {
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
      duration: episode.file.duration,
    };
  });
  const lastEpisodes = episodesArray.slice(0, 2);
  const allEpisodes = episodesArray.slice(2, episodesArray.length);
  return {
    props: {
      lastEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 24,
  };
};
