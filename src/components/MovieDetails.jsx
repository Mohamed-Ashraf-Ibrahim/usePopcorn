import { useState, useEffect, useRef } from "react";
import StarsRating from "./StarsRating";
import { Loader } from "./Loader";
import { useKey } from "../useKey";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const KEY = "aac862ac";

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  });

  // Effect for Change the document title
  useEffect(() => {
    document.title = `Movie | ${title}`;
    // Solution
    return () => {
      document.title = "usePopcorn";
      console.log(`${title}`);
    };
  }, [title]);

  // Hook for implement the key press feature
  useKey("Escape", onCloseMovie);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      year,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      userRating,
      countRatingClicks: countRef.current,
    };
    onAddMovie(newWatchedMovie);
    onCloseMovie();
  }

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`this is a poster of ${movie}`}></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull;</p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            {
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarsRating
                      maxRating={10}
                      size={24}
                      onSetRating={setUserRating}
                    />
                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        Add to watched list
                      </button>
                    )}
                  </>
                ) : (
                  <p>You rated this movie with {watchedUserRating} stars.⭐</p>
                )}
              </div>
            }
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by: {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
