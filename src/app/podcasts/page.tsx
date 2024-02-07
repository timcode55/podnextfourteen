import Header from "../../components/header";
import Filter from "../../components/filter";
import classes from "./podcasts.module.css";
import { getRatingDataFromDb } from "@/lib/actions/actions";
import { getTopPodsByCategory } from "@/lib/actions/actions";

export const revalidate = 86400;

export default async function Podcasts() {
  let data = await getTopPodsByCategory(67, 1);
  let finalPods = await getRatingDataFromDb(data);

  return (
    <div className={classes.mainContainer}>
      <Filter />
      <Header podcasts={finalPods} />
    </div>
  );
}
