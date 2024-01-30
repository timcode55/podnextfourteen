"use server";

import { connectToDatabase, getClient } from "@/helpers/database/mongodb";
import { revalidatePath } from "next/cache";

export async function getRatingDataFromDb(podArray) {
  let test = Array.isArray(podArray);
  console.log(test, "test");
  console.log(podArray, "podArray");
  let mongoClient;
  try {
    mongoClient = getClient();
  } catch (error) {
    console.log(error, "ERROR GETTING MONGO CLIENT*****");
  }
  if (!mongoClient) {
    mongoClient = await connectToDatabase();
  }
  const finalArray = [];

  const db = mongoClient.db();
  const getTopPods = db.collection("ratings");

  try {
    for (const pod of podArray) {
      const result = await getTopPods.findOne({ id: pod.id });
      pod.rating = result?.rating ?? null;
      pod.numberOfRatings = result?.numberOfRatings ?? null;
      pod.itunes = result?.itunes ?? null;
      finalArray.push(pod);
    }
  } catch (error) {
    console.error("Failed to update podcasts from DB", error);
  }
  console.log(finalArray, "FINAL ARRAY");
  return finalArray;
}

export async function getTopPodsByCategory(categoryId, page) {
  try {
    const response = await fetch(
      `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${categoryId}&page=${page}&region=us&safe_mode=0`,
      {
        // next: { revalidate: 86400 },
        headers: {
          "X-ListenAPI-Key": process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY,
          "Cache-Control": "max-age=86400",
          "CDN-Cache-Control": "max-age=86400",
          "Vercel-CDN-Cache-Control": "max-age=86400",
        },
      }
    );

    const data = await response.json(); // Await the JSON parsing
    return data?.podcasts;
  } catch (error) {
    console.log("error fetching new podcasts", error);
  }
}

export async function getFilteredPodcasts(rating, numRatings, genre) {
  console.log(rating, "RATING");
  // let mongoClient;
  // try {
  //   mongoClient = getClient();
  // } catch (error) {
  //   console.log(error, "ERROR GETTING MONGO CLIENT*****");
  // }
  // if (!mongoClient) {
  //   mongoClient = await connectToDatabase();
  // }
  // // const finalArray = [];

  // // const db = mongoClient.db();
  // // const getTopPods = db.collection("ratings");

  // try {
  //   const db = mongoClient.db();
  //   const getTopPods = db.collection("ratings");

  //   const result = await getTopPods
  //     .find({
  //       rating: { $gte: Number(rating) },
  //       numberOfRatings: { $gte: Number(numRatings) },
  //       listenNotesGenre: genre,
  //     })
  //     .toArray();

  //   console.log(result, "gettoppodcasts from Mongodb");

  //   // client.close();

  //   return result;
  // } catch (e) {
  //   console.error(e, "Error getting data from the DB");
  // }
  let mongoClient;
  try {
    mongoClient = getClient();
  } catch (error) {
    console.log(error, "ERROR GETTING MONGO CLIENT*****");
  }
  if (!mongoClient) {
    mongoClient = await connectToDatabase();
  }

  const db = mongoClient.db();
  const getFilteredPods = db.collection("ratings");
  try {
    console.log(rating, numRatings, genre);
    const decodedGenre = decodeURIComponent(genre);
    const result = await getFilteredPods
      .find({
        rating: { $gte: Number(rating) },
        numberOfRatings: { $gte: Number(numRatings) },
        listenNotesGenre: decodedGenre,
      })
      .toArray();
    console.log(result, "result for filtered");
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Failed to update filtered podcasts from DB", error);
  }
}
