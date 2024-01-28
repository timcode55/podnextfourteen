"use client";
import { createContext, useState } from "react";

const PodcastContext = createContext({
  podcasts: [],
  setCategory: function () {},
  loader: false,
  setRating: (rating: Number) => {},
  setLoader: (loader: Boolean) => {},
});

export function PodcastContextProvider(props) {
  const [podcasts, setPodcasts] = useState([]);
  const [category, setCategory] = useState(null);
  const [recommend, setRecommend] = useState(null);
  const [loader, setLoader] = useState(false);
  const [rating, setRating] = useState("⭐️ 1.0");
  const [numberRatings, setNumberRatings] = useState(20);
  const [genre, setGenre] = useState("AI & Data Science");
  const [recent, setRecentUpdate] = useState(null);
  const [page, setPage] = useState(1);

  function setCategoryHandler(categoryName, categoryId) {
    setCategory({ page: 1, category: categoryName, id: categoryId });
  }

  function setPodcastsHandler(podcasts) {
    setPodcasts(podcasts);
  }

  function setLoaderHandler(loader) {
    setLoader(loader);
  }

  function setRecommendHandler(podcasts) {
    setRecommend(podcasts);
  }

  function setRatingHandler(rating) {
    setRating(rating);
  }

  function setNumberRatingsHandler(numberRatings) {
    setNumberRatings(numberRatings);
  }

  function setGenreHandler(genre) {
    setGenre(genre);
  }
  function setRecentUpdateHandler(recent) {
    setRecentUpdate(recent);
  }
  function setPageHandler(page) {
    setPage(page);
  }

  const context = {
    podcasts: podcasts,
    category: category,
    recommend: recommend,
    rating,
    numberRatings,
    genre,
    recent,
    loader: loader,
    page,
    setCategory: setCategoryHandler,
    setLoader: setLoaderHandler,
    setPodcasts: setPodcastsHandler,
    setRecommend: setRecommendHandler,
    setRating: setRatingHandler,
    setNumberRatings: setNumberRatingsHandler,
    setGenre: setGenreHandler,
    setRecentUpdate: setRecentUpdateHandler,
    setPage: setPageHandler,
  };

  return (
    <PodcastContext.Provider value={context}>
      {props.children}
    </PodcastContext.Provider>
  );
}

export default PodcastContext;
