import classes from "./podCard.module.css";
import Link from "next/link";

interface PodCardProps {
  podcast: {
    title: string;
    description: string;
    rating: number;
    numberOfRatings: number;
    id: number;
    image: string;
    listennotes_url: string;
    website: string;
    itunes: string;
  };
}

const PodCard = (props: PodCardProps) => {
  const { podcast } = props;
  console.log(podcast, "PODCAST IN PODCARD");

  return (
    <div className={classes.divStyle}>
      <div className={classes.podcontainer}>
        <div className={classes.podcontent}>
          <Link href={`/podcasts/${podcast.id}`}>
            <img className={classes.podimage} src={podcast.image} alt="pod1" />
          </Link>
          <div className={classes.podtitle}>
            <h1>{podcast.title.substring(0, 52)}</h1>
          </div>
          <div className={classes.desc}>
            <p className={classes.ptext}>
              {podcast.description
                .substring(0, 200)
                .replace(/(<([^>]+)>)/gi, "")}
              ...
            </p>
          </div>
          <div className={classes.podButtons}>
            <a href={podcast.website || ""} target="_blank" rel="noreferrer">
              <button className={classes.webButton}>Website</button>
            </a>
            <a href={podcast.itunes || ""} target="_blank" rel="noreferrer">
              <button
                className={`${classes.webButton} ${
                  podcast.itunes ? "" : classes.disabled
                }`}
                disabled={!podcast.itunes}
              >
                iTunes Link
              </button>
            </a>
          </div>

          <div className={classes.contratings}>
            <div>
              <p className={classes.ratingtext}># of Ratings</p>
              <p className={classes.ratingtext}>{podcast.numberOfRatings}</p>
            </div>
            <div>
              <p className={classes.ratingtext}>iTunes Rating</p>
              <p className={classes.ratingtext}>{podcast.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodCard;
