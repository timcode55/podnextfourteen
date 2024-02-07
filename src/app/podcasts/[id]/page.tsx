"use client";
import axios from "axios";
import { useEffect } from "react";
import PodList from "@/components/podList";
import { getRatingDataFromDb } from "@/lib/actions/actions";

import { usePodcastContext } from "@/store/podcastContext";

import { ParsedUrlQuery } from "querystring";

interface PodcastDetailPageProps {
  params: {
    id: string;
  };
  searchParams: ParsedUrlQuery;
}

async function getPodcast(podId: String) {
  const response = await axios.get(
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

export default function PodcastDetailPage({
  params,
  searchParams,
}: PodcastDetailPageProps) {
  const PodcastCtx = usePodcastContext();

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
          PodcastCtx.setPodcasts(finalPodData);
          PodcastCtx.setRecentUpdate("similar");
        } catch (error) {
          console.error("Error fetching podcast:", error);
        }
      }
    };
    fetchPodcast();
  }, [searchParams]);

  if (!PodcastCtx.podcasts) {
    return <div>Loading...</div>;
  }

  console.log(PodcastCtx.podcasts, "PODCASTS in [id]/page.tsx");

  return (
    <div>
      <h1 className="recommend-title">Recommended Similar Podcasts</h1>
      <PodList
        podcasts={PodcastCtx.podcasts}
        getNewPodcasts={() => {}}
        renderCache={() => {}}
        podCache={[]}
      />
    </div>
  );
}
