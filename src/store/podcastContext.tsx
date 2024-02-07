"use client";
import { createContext, useState, ReactNode, useContext } from "react";

interface Podcast {
  title: string;
  description: string;
  rating: number;
  numberOfRatings: number;
  id: number;
  image: string;
  listennotes_url: string;
  website: string;
  itunes: string;
}

// Define the context type
interface PodcastContextType {
  podcasts: Podcast[];
  category: { page: number; category: string; id: string } | null;
  recommend: Podcast[];
  rating: string;
  numberRatings: number;
  genre: string;
  recent: string | null;
  loader: boolean;
  page: number;
  key: string;
  setCategory: (categoryName: string, categoryId: number) => void;
  setLoader: (loader: boolean) => void;
  setPodcasts: (podcasts: Podcast[]) => void;
  setRecommend: (podcasts: Podcast[]) => void;
  setRating: (rating: string) => void;
  setNumberRatings: (numberRatings: number) => void;
  setGenre: (genre: string) => void;
  setRecentUpdate: (recent: string | null) => void;
  setPage: (page: number) => void;
  setKey: (key: string) => void;
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
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [category, setCategory] = useState<{
    page: number;
    category: string;
    id: string;
  } | null>(null);
  const [recommend, setRecommend] = useState<Podcast[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [rating, setRating] = useState<string>("⭐️ 1.0");
  const [numberRatings, setNumberRatings] = useState<number>(20);
  const [genre, setGenre] = useState<string>("AI & Data Science");
  const [recent, setRecentUpdate] = useState<string | null>(null);
  const [key, setKey] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  // Handler functions
  const setCategoryHandler = (categoryName: string, categoryId: number) => {
    setCategory({ page: 1, category: categoryName, id: categoryId.toString() });
  };

  const setPodcastsHandler = (podcasts: Podcast[]) => {
    setPodcasts(podcasts);
  };

  const setLoaderHandler = (loader: boolean) => {
    setLoader(loader);
  };

  const setRecommendHandler = (podcasts: Podcast[]) => {
    setRecommend(podcasts);
  };

  const setRatingHandler = (rating: string) => {
    setRating(rating);
  };

  const setKeyHandler = (key: string) => {
    setKey(key);
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
    key,
    setCategory: setCategoryHandler,
    setLoader: setLoaderHandler,
    setPodcasts: setPodcastsHandler,
    setRecommend: setRecommendHandler,
    setRating: setRatingHandler,
    setNumberRatings: setNumberRatingsHandler,
    setGenre: setGenreHandler,
    setRecentUpdate: setRecentUpdateHandler,
    setPage: setPageHandler,
    setKey: setKeyHandler,
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
