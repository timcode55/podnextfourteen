"use client";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import PodList from "@/components/podList";
import { getRatingDataFromDb } from "@/lib/actions/actions";

async function getPodcast(podId: String) {
  const response = await axios.get(
    // `https://listen-api.listennotes.com/api/v2/podcasts/${podId}?next_episode_pub_date=1479154463000&sort=recent_first`,
    `https://listen-api.listennotes.com/api/v2/podcasts/${podId}/recommendations?safe_mode=0`,
    {
      headers: {
        "X-ListenAPI-Key": process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY,
      },
    }
  );
  console.log(response.data, "RESPONSE.DATA");
  return response.data;
}

export default function PodcastDetailPage({ params, searchParams }) {
  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  console.log(params, "PARAMS");
  console.log(searchParams, "SEARCHPARAMS");
  const [podcasts, setPodcasts] = useState(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      const podId = params.id;
      if (podId) {
        try {
          const podcastData = await getPodcast(podId);
          console.log(podcastData.recommendations, "PODCASTDATA");
          const finalPodData = await getRatingDataFromDb(
            podcastData.recommendations
          );
          setPodcasts(finalPodData);
        } catch (error) {
          console.error("Error fetching podcast:", error);
        }
      }
    };
    fetchPodcast();
  }, [searchParams]);

  if (!podcasts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="recommend-title">Recommended Similar Podcasts</h1>
      <h2>{podcasts.description}</h2>
      <PodList podcasts={podcasts} />
    </div>
  );
}
