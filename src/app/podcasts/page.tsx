import Header from "../../components/header";
// import PodList from "@/components/podList";
import Filter from "../../components/filter";
import classes from "./podcasts.module.css";
// import { connectToDatabase, getClient } from "@/helpers/database/mongodb";
import { getRatingDataFromDb } from "@/lib/actions/actions";

async function Podcasts() {
  // let mongoClient;
  // try {
  //   mongoClient = getClient();
  // } catch (error) {
  //   console.log(error, "ERROR GETTING MONGO CLIENT*****");
  // }
  // if (!mongoClient) {
  //   mongoClient = await connectToDatabase();
  // }

  // // try {
  // const db = mongoClient.db();
  // const getTopPods = db.collection("ratings");

  const response = await fetch(
    `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${67}&page=${1}&region=us&safe_mode=0`,
    {
      cache: "no-store",
      headers: {
        "X-ListenAPI-Key": process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY,
        "Cache-Control": "max-age=86400",
        "CDN-Cache-Control": "max-age=86400",
        "Vercel-CDN-Cache-Control": "max-age=86400",
      },
    }
  );
  const data = await response.json();
  let finalPods = await getRatingDataFromDb(data?.podcasts);
  return (
    <div className={classes.mainContainer}>
      <Filter />
      <Header podcasts={finalPods} />
    </div>
  );
}

export default Podcasts;
