"use client";
import classes from "./filter.module.css";
import { usePodcastContext } from "@/store/podcastContext";
import { categoriesArray } from "../utils/category-list";
import { filterNumberRatings } from "../utils/filterNumberRatings";
import { ratings } from "../utils/ratings";
import { getFilteredPodcasts } from "@/lib/actions/actions";

const Filter = () => {
  const podcastCtx = usePodcastContext();
  // console.log(usePodcastContext(), "PODCASTCTX in filter");

  const handleRatingInput = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const target = e.target as HTMLSelectElement;
    podcastCtx.setRating(target.value);
  };

  const handleGenreInput = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const target = e.target as HTMLSelectElement;
    podcastCtx.setGenre(target.value);
  };

  const handleNumRatingsInput = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const target = e.target as HTMLSelectElement;
    podcastCtx.setNumberRatings(parseInt(target.value));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    interface Podcast {
      title: string;
      description: string;
      rating: number;
      numberOfRatings: number;
      id: number;
    }

    try {
      podcastCtx.setLoader(true);
      podcastCtx.setRecentUpdate("recommend");
      const stringGenre = encodeURIComponent(podcastCtx.genre);
      const topFilteredPods = await getFilteredPodcasts(
        podcastCtx.rating,
        podcastCtx.numberRatings,
        stringGenre
      );
      const result = topFilteredPods.sort((a: Podcast, b: Podcast) => {
        return b.rating - a.rating;
      });
      podcastCtx.setRecommend(result);

      console.log(result, "result");
      podcastCtx.setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.filterContainer}>
      <div className={classes.formContainer}>
        <h1 className={classes.title}>SEARCH BY RATING</h1>
        <form className={classes.formWrapper}>
          <div className={classes.filterSelection}>
            <div className={classes.filterWrapper}>
              <p className={classes.filterTitle}>Enter Min Rating</p>
              <select
                className="selection"
                name="scripts"
                onChange={handleRatingInput}
                style={{ marginLeft: "10px" }}
              >
                {ratings.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={classes.filterSelection}>
            <div className={classes.filterWrapper}>
              <p className={classes.filterTitle}>Enter # of Ratings</p>
              <select
                className="selection"
                name="scripts"
                onChange={handleNumRatingsInput}
                style={{ marginLeft: "10px" }}
              >
                {filterNumberRatings.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={classes.filterSelection}>
            <div className={classes.filterWrapper}>
              <p className={classes.filterTitle}>Genre</p>
              <select
                className="selection"
                name="scripts"
                onChange={handleGenreInput}
                style={{ marginLeft: "10px" }}
              >
                {categoriesArray.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={classes.buttonWrapper}>
            <button
              className={classes.filterButton}
              type="submit"
              onClick={handleClick}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
