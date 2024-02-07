"use client";
import PodCard from "./podCard";
import classes from "./podList.module.css";
import Arrow from "./arrow";
import { usePodcastContext } from "../store/podcastContext";

interface PodListProps {
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
  getNewPodcasts: Function;
  renderCache: Function;
  podCache: any;
}

const PodList = (props: PodListProps) => {
  const PodcastCtx = usePodcastContext();
  return (
    <div className={classes.outerContainer}>
      {PodcastCtx.loader ? (
        <div className={classes.loadContainer}>
          <div className={classes.loader}>
            <div className={`${classes.inner} ${classes.one}`}></div>
            <div className={`${classes.inner} ${classes.two}`}></div>
            <div className={`${classes.inner} ${classes.three}`}></div>
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.podcastDisplay}>
            {props.podcasts &&
              props?.podcasts?.map((pod) => (
                <div key={pod.id}>
                  <PodCard
                    key={pod.id}
                    podcast={{
                      ...pod,
                      image: pod.image || "",
                      listennotes_url: pod.listennotes_url || "",
                      website: pod.website || "",
                      itunes: pod.itunes || "",
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
      {!PodcastCtx.loader &&
      PodcastCtx.recent !== "recommend" &&
      PodcastCtx.recent !== "similar" ? (
        <Arrow
          getNewPodcasts={props.getNewPodcasts}
          renderCache={props.renderCache}
          podCache={props.podCache}
        />
      ) : null}
    </div>
  );
};

export default PodList;
