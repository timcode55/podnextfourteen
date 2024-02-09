import axios from "axios";
import { connectToDatabase } from "@/helpers/database/mongodb";

export async function GET(request, res) {
  const categoryId = request.nextUrl.searchParams.get("categoryId");
  const page = request.nextUrl.searchParams.get("page");

  if (request.method === "GET") {
    let mongoClient;
    try {
      mongoClient = await connectToDatabase();
    } catch (error) {
      return Response.status(401).json({
        message: "Sorry, DB is not working",
      });
    }
    try {
      const db = mongoClient.db();
      const getTopPods = db.collection("ratings");
      console.log(categoryId, "CATEGORY ID");
      console.log(page, "page");
      const response = await axios.get(
        `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${categoryId}&page=${page}&region=us&sort=listen_score&safe_mode=0`,
        {
          headers: {
            "X-ListenAPI-Key": process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY,
          },
        }
      );
      const data = response.data.podcasts;
      console.log(data, "DATA");
      //Update Cache
      const finalArray = [];
      for (let pod of response.data.podcasts) {
        const result = await getTopPods.find({ id: pod.id }).toArray();
        if (result.length > 0) {
          pod.rating = result[0].rating;
          pod.numberOfRatings = result[0].numberOfRatings;
          pod.itunes = result[0].itunes;
          pod.TESTING = "TESTING";
        } else {
          pod.rating = null;
          pod.numberOfRatings = null;
          pod.itunes = null;
        }

        finalArray.push(pod);
      }
      return new Response(finalArray[0].title, {
        status: 201,
      });
    } catch (err) {
      Response.json({ message: "Shit did not work" }, { status: 401 });
    }
  }
}
