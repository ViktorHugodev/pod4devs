import { GetStaticProps } from "next";
import Head from 'next/head';
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
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
  const { playList} = useContext(PlayerContext)
  const episodeList = [...lastEpisodes, ...allEpisodes]
  console.log(episodeList)
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Podcastr</title>
      </Head>
      <section className={styles.lastEpisodes}>
        <h2>Últimos lançamentos</h2>

        
          {lastEpisodes.map((episode: EpisodesProps, index: number) => {
            return (
              <div key={episode.id}>
                <Image
                  src={episode.thumbnail}
                  alt={episode.title}
                  width={220}
                  height={140}
                  objectFit={"cover"}
                />
                <div className={styles.episodeDetails}>
									<Link href={`/episode/${episode.id}`}>
										<a>{episode.title}</a>
									</Link>
                 
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt} - </span>
                  <span>{episode.durationString}</span>
                  <button type="button" onClick={() => playList(episodeList, index)}>
                    <img src="/play-green.svg" alt="Tocar música" />
                  </button>
                </div>
              </div>
            );
          })}
        
      </section>
      <section className={styles.allEpisodes}>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 80 }}>
                    <Image
                      src={episode.thumbnail}
                      width={120}
                      height={120}
                      alt={episode.title}
                      objectFit={"cover"}
                    />
                  </td>
                  <td>
									<Link href={`/episode/${episode.id}`}>
										<a>{episode.title}</a>
									</Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100, fontSize: ".75rem" }}>
                    {episode.publishedAt}
                  </td>
                  <td>{episode.durationString}</td>
                  <td>
                    <button type="button" onClick={() => playList(episodeList, index + lastEpisodes.length)}>
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
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
      duration:episode.file.duration
    };
  });
  const lastEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);
  return {
    props: {
      lastEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 24,
  };
};
//Posso adicionar esses podcasts direto do YouTube, vou tentar utilizar o meio de apenas audio e o meio de video tbm.
//Já tenhp a API meio pronta do Next, ajudaria muito adicionar esses podcasts
