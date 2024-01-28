"use client";
import React, { useState, useContext, useEffect } from "react";
import PodList from "./podList";
import { array1, array2, categoriesArray } from "@/utils/category-list";
import PodcastContext from "@/store/podcastContext";
import classes from "./header.module.css";

import { getTopPodsByCategory } from "@/lib/actions/actions";
import { getRatingDataFromDb } from "@/lib/actions/actions";
const podCache = {};

const Header = (props) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [podcasts, setPodcasts] = useState(props.podcasts);
  const [loader, setLoader] = useState(false);
  const [mostRecentUpdate, setMostRecentUpdate] = useState("podcasts");
  const podcastCtx = useContext(PodcastContext);
  const saveToCache = (genreId, page, array) => {
    const key = `${genreId}_${page}`;
    if (!podCache[key]) {
      podCache[key] = array;
    }
  };

  const renderCache = (key) => {
    if (podCache[key]) {
      setPodcasts(podCache[key]);
    } else {
      getNewPodcasts(category, podcastCtx.page);
    }
  };

  podCache["67_1"] = props.podcasts || [];

  const handleChange = (e) => {
    setValue(e.target.value);
    let findValue = Number(e.target.value);

    let categoryName = categoriesArray.find(
      (item) => item.id === findValue
    ).name;

    let categoryId = categoriesArray.find((item) => item.id === findValue).id;
    setCategory(categoryName, categoryId);
    podcastCtx.setCategory(categoryName, categoryId);
    podcastCtx.page = 1;
    const key = `${categoryId}_${podcastCtx.page}`;
    console.log(key, "KEY FOR CACHE");
    if (podCache[key]) {
      renderCache(key);
    } else {
      getNewPodcasts(e.target.value, 1);
    }
  };

  async function getNewPodcasts(
    categoryId: String,
    page: Number,
    genreId: String
  ) {
    console.log(categoryId, "CATEGORYID");
    podcastCtx.setLoader(true);
    const updatedCategoryPods = await getTopPodsByCategory(categoryId, page);

    const getPodRatingDataFromDB = await getRatingDataFromDb(
      updatedCategoryPods
    );
    console.log(getPodRatingDataFromDB, "getPodRatingDataFromDB");
    setPodcasts(getPodRatingDataFromDB);
    const key = `${categoryId}_${page}`;
    podCache[key] = getPodRatingDataFromDB || [];
  }

  useEffect(() => {
    if (podcastCtx.recent === "recommend") {
      setPodcasts(podcastCtx.recommend);
      setMostRecentUpdate("recommend");
    } else if (podcastCtx.recent === "podcasts") {
      setPodcasts(podcastCtx.podcasts);
      setMostRecentUpdate("podcasts");
    }
  }, [podcastCtx.recommend, podcastCtx.podcasts, podcastCtx.recent]);

  // console.log(podcasts, "PODCASTS AFTER CATEGORY CHANGE");

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
          category={parseInt(value)}
          getData={props.getApiData}
          status={props.status}
          cache={props.cache}
          getNewPodcasts={getNewPodcasts}
          renderCache={renderCache}
          podCache={podCache}
        />
      )}
    </div>
  );
};

export default Header;
