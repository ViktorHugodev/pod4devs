// import { GetStaticPaths, GetStaticProps } from "next";
// import Head from "next/head";
// import Image from "next/image";
// import Link from "next/link";
// import { useContext } from "react";
// import { PlayerContext } from "../../contexts/PlayerContext";
// import { api } from "../../services/api";
// import { convertSecondInHourMinute } from "../../utils/convertHourMinute";
// import styles from "./episode.module.scss";
// interface EpisodesProps {
//   id: string;
//   title: string;
//   members: string;
//   publishedAt: string;
//   thumbnail: string;
//   description: string;
//   durationString: string;
//   url: string;
//   duration: number;
// }
// interface Episode {
//   episode: EpisodesProps;
// }

// export default function Episode({ episode }: Episode) {
//   const {handlePlay} = useContext(PlayerContext)
//   return (
//     <div className={styles.episode}>
//        <Head>
//         <title>Podcastr</title>
//       </Head>
//       <div className={styles.thumbnail}>
//         <Link href="/">
//           <button>
//             <img src="/arrow-left.svg" alt="Voltar" />
//           </button>
//         </Link>
//         <Image
//           src={episode.thumbnail}
//           width={700}
//           height={260}
//           alt={episode.title}
//           objectFit="cover"
//         />
//         <button onClick={() => handlePlay(episode)}>
//           <img src="/play-green.svg" alt="Tocar música" />
//         </button>
//       </div>
//       <header>
//         <h1>{episode.title}</h1>
//         <span>{episode.members}</span>
//         <span>{episode.publishedAt}</span>
//         <span>{episode.durationString}</span>
//       </header>

//       <div
//         className={styles.description}
//         dangerouslySetInnerHTML={{ __html: episode.description }}
//       />
//     </div>
//   );
// }
// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await api.get("episodes", {
//     params: {
//       _limit: 2,
//       _sort: "published_at",
//       _order: "desc",
//     },
//   });
//   const paths = data.map(episode => {
//     return {
//       params: {
//         id: episode.id
//       }
//     }
//   })

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };
// export const getStaticProps: GetStaticProps = async (context) => {
//   const { id } = context.params;
//   const { data } = await api.get(`/episodes/${id}`);

//   const episode = {
//     id: data.id,
//     title: data.title,
//     members: data.members,
//     publishedAt: new Date(data.published_at).toLocaleDateString("en-US", {
//       month: "short",
//       day: "2-digit",
//       year: "2-digit",
//     }),
//     thumbnail: data.thumbnail,
//     description: data.description,
//     url: data.file.url,
//     durationString: convertSecondInHourMinute(Number(data.file.duration)),
//     duration: data.file.duration
//   };

//   return {
//     props: {
//       episode,
//     },
//     revalidate: 60 * 60 * 24,
//   };
// };
