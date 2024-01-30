"use client";
// import { createContext, useState } from "react";

// const PodcastContext = createContext({
//   podcasts: [],
//   setCategory: function () {},
//   loader: false,
//   setRating: (rating: Number) => {},
//   setLoader: (loader: Boolean) => {},
//   setNumberRatings: (numberRatings: Number) => {},
//   setGenre: (genre: String) => {},
//   setRecentUpdate: (recent: String) => {},
//   setPage: (page: Number) => {},
// });

// export function PodcastContextProvider(props) {
//   const [podcasts, setPodcasts] = useState([]);
//   const [category, setCategory] = useState(null);
//   const [recommend, setRecommend] = useState(null);
//   const [loader, setLoader] = useState(false);
//   const [rating, setRating] = useState("⭐️ 1.0");
//   const [numberRatings, setNumberRatings] = useState(20);
//   const [genre, setGenre] = useState("AI & Data Science");
//   const [recent, setRecentUpdate] = useState(null);
//   const [page, setPage] = useState(1);

//   function setCategoryHandler(categoryName: String, categoryId: String) {
//     setCategory({ page: 1, category: categoryName, id: categoryId });
//   }

//   function setPodcastsHandler(podcasts: []) {
//     setPodcasts(podcasts);
//   }

//   function setLoaderHandler(loader) {
//     setLoader(loader);
//   }

//   function setRecommendHandler(podcasts) {
//     setRecommend(podcasts);
//   }

//   function setRatingHandler(rating) {
//     setRating(rating);
//   }

//   function setNumberRatingsHandler(numberRatings) {
//     setNumberRatings(numberRatings);
//   }

//   function setGenreHandler(genre) {
//     setGenre(genre);
//   }
//   function setRecentUpdateHandler(recent) {
//     setRecentUpdate(recent);
//   }
//   function setPageHandler(page) {
//     setPage(page);
//   }

//   const context = {
//     podcasts: podcasts,
//     category: category,
//     recommend: recommend,
//     rating,
//     numberRatings,
//     genre,
//     recent,
//     loader: loader,
//     page,
//     setCategory: setCategoryHandler,
//     setLoader: setLoaderHandler,
//     setPodcasts: setPodcastsHandler,
//     setRecommend: setRecommendHandler,
//     setRating: setRatingHandler,
//     setNumberRatings: setNumberRatingsHandler,
//     setGenre: setGenreHandler,
//     setRecentUpdate: setRecentUpdateHandler,
//     setPage: setPageHandler,
//   };

//   return (
//     <PodcastContext.Provider value={context}>
//       {props.children}
//     </PodcastContext.Provider>
//   );
// }

// export default PodcastContext;

// Import statements
import { createContext, useState, ReactNode, useContext } from "react";

// Define the context type
interface PodcastContextType {
  podcasts: any[];
  category: { page: number; category: string; id: string } | null;
  recommend: any[] | null;
  rating: string;
  numberRatings: number;
  genre: string;
  recent: string | null;
  loader: boolean;
  page: number;
  setCategory: (categoryName: string, categoryId: string) => void;
  setLoader: (loader: boolean) => void;
  setPodcasts: (podcasts: any[]) => void;
  setRecommend: (podcasts: any[] | null) => void;
  setRating: (rating: string) => void;
  setNumberRatings: (numberRatings: number) => void;
  setGenre: (genre: string) => void;
  setRecentUpdate: (recent: string | null) => void;
  setPage: (page: number) => void;
}

// Create the context
const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

// Define the provider component
interface PodcastContextProviderProps {
  children: ReactNode;
}

export function PodcastContextProvider({
  children,
}: PodcastContextProviderProps) {
  // State variables
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [category, setCategory] = useState<{
    page: number;
    category: string;
    id: string;
  } | null>(null);
  const [recommend, setRecommend] = useState<any[] | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [rating, setRating] = useState<string>("⭐️ 1.0");
  const [numberRatings, setNumberRatings] = useState<number>(20);
  const [genre, setGenre] = useState<string>("AI & Data Science");
  const [recent, setRecentUpdate] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  // Handler functions
  const setCategoryHandler = (categoryName: string, categoryId: string) => {
    setCategory({ page: 1, category: categoryName, id: categoryId });
  };

  const setPodcastsHandler = (podcasts: any[]) => {
    setPodcasts(podcasts);
  };

  const setLoaderHandler = (loader: boolean) => {
    setLoader(loader);
  };

  const setRecommendHandler = (podcasts: any[] | null) => {
    setRecommend(podcasts);
  };

  const setRatingHandler = (rating: string) => {
    setRating(rating);
  };

  const setNumberRatingsHandler = (numberRatings: number) => {
    setNumberRatings(numberRatings);
  };

  const setGenreHandler = (genre: string) => {
    setGenre(genre);
  };

  const setRecentUpdateHandler = (recent: string | null) => {
    setRecentUpdate(recent);
  };

  const setPageHandler = (page: number) => {
    setPage(page);
  };

  // Context value
  const contextValue: PodcastContextType = {
    podcasts,
    category,
    recommend,
    rating,
    numberRatings,
    genre,
    recent,
    loader,
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

  // Return the context provider
  return (
    <PodcastContext.Provider value={contextValue}>
      {children}
    </PodcastContext.Provider>
  );
}

export function usePodcastContext() {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error(
      "usePodcastContext must be used within a PodcastContextProvider"
    );
  }
  return context;
}
