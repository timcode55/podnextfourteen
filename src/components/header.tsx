"use client";
import React, { useState, useEffect } from "react";
import PodList from "./podList";
import { array1, array2, categoriesArray } from "@/utils/category-list";
import { usePodcastContext } from "@/store/podcastContext";
import classes from "./header.module.css";

import { getTopPodsByCategory } from "@/lib/actions/actions";
import { getRatingDataFromDb } from "@/lib/actions/actions";

interface HeaderProps {
  podcasts: Array<{
    title: string;
    description: string;
    rating: number;
    numberOfRatings: number;
    id: number;
    image: string;
    listennotes_url: string;
    website: string;
    itunes: string;
  }>;
}

const podCache: any = {};

const Header = (props: HeaderProps) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [podcasts, setPodcasts] = useState(props.podcasts);
  const [loader, setLoader] = useState(false);
  const [mostRecentUpdate, setMostRecentUpdate] = useState("podcasts");
  const podcastCtx = usePodcastContext();

  const renderCache = (key: string) => {
    console.log(key, "KEY FOR CACHE, check rendercache");
    console.log(podCache, "PODCACHE CHECK RENDERCACHE");

    setPodcasts(podCache[key]);
  };

  podCache["67_1"] = props.podcasts || [];

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    podcastCtx.setRecentUpdate("podcasts");
    const target = e.target as HTMLSelectElement;
    setValue(target.value);
    let findValue: number = Number(target.value);

    let categoryName = categoriesArray?.find(
      (item) => item.id === findValue
    )?.name;

    let categoryId = categoriesArray?.find((item) => item.id === findValue)?.id;
    setCategory(categoryName || "");
    podcastCtx.setCategory(categoryName || "", categoryId || 0);
    podcastCtx.setPage(1);
    const key = `${categoryId}_${podcastCtx.page}`;
    console.log(key, "KEY FOR CACHE");

    podcastCtx.setKey(key);
    podcastCtx.setPage(1);
    if (podCache[key]) {
      renderCache(key);
    } else {
      console.log("had to get new podccats");
      getNewPodcasts(target.value, 1);
    }
  };

  async function getNewPodcasts(categoryId: String, page: Number) {
    console.log(categoryId, "CATEGORYID");
    podcastCtx.setLoader(true);
    const updatedCategoryPods = await getTopPodsByCategory(categoryId, page);

    const getPodRatingDataFromDB = await getRatingDataFromDb(
      updatedCategoryPods
    );
    console.log(getPodRatingDataFromDB, "getPodRatingDataFromDB");
    setPodcasts(getPodRatingDataFromDB);
    podcastCtx.setPodcasts(getPodRatingDataFromDB);
    const key = `${categoryId}_${page}`;
    podCache[key] = getPodRatingDataFromDB || [];
    podcastCtx.setLoader(false);
  }

  useEffect(() => {
    if (podcastCtx.recent === "recommend") {
      podcastCtx.setPodcasts(podcastCtx.recommend);
      setMostRecentUpdate("recommend");
    } else if (podcastCtx.recent === "podcasts") {
      setPodcasts(podcastCtx.podcasts);
      setMostRecentUpdate("podcasts");
    } else if (podCache[podcastCtx.key]) {
      setPodcasts(podCache[podcastCtx.key]);
      podcastCtx.setPodcasts(podCache[podcastCtx.key]);
      setMostRecentUpdate("podcasts");
    }
  }, [podcastCtx.recommend, podcastCtx.podcasts, podcastCtx.recent]);

  console.log(podCache, "PODCAST CACHE");
  console.log(podcasts, "podcasts check for cache working after recommend");
  return (
    <div className={classes.backgroundContainer}>
      <div className={classes.headerContainer}>
        {podcastCtx.recent === "recommend" ? (
          <h1 className={classes.title}>FILTERED BY RATING</h1>
        ) : (
          <h1 className={classes.title}>
            TOP PODCASTS -{" "}
            {category.toUpperCase() || "most popular".toUpperCase()}{" "}
          </h1>
        )}

        <div className={classes.selectionBoxContainer}>
          <div className={classes.selectionBox}>
            <form>
              <label>
                <span>Choose a Genre (A - M) </span>
              </label>
              <select
                id="selection"
                name="scripts"
                onChange={handleChange}
                className={classes.selection}
              >
                {array1.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>

          <div className={classes.selectionBox}>
            <form>
              <label>
                <span className={classes.dropdownTitle}>
                  Choose a Genre (M - Z){" "}
                </span>
                <select
                  id="selection2"
                  name="scripts"
                  onChange={handleChange}
                  className={classes.selection}
                >
                  {array2.map((item) => {
                    return (
                      <option
                        className={classes.option}
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </form>
          </div>
        </div>
        <div className={classes.filterWrapper}></div>
      </div>
      {loader ? (
        "....loading"
      ) : (
        <PodList
          podcasts={podcasts}
          getNewPodcasts={getNewPodcasts}
          renderCache={renderCache}
          podCache={podCache}
        />
      )}
    </div>
  );
};

export default Header;
