import { WatchedMovie } from "./WatchedMovie";

export default function WatchedMoviesList({ watched = [], onDeleteMovie }) {
  if (!watched || watched.length === 0) return;

  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.id}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
}
