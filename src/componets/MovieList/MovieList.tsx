import React from "react";
import "./MovieList.css";

type Props = {
  movies: IMovie[];
};

const MovieList = ({ movies }: Props) => {
  const hasMovies = movies?.length > 0;
  return (
    <div className="MovieList">
      {hasMovies ? (
        movies.map((movie) => <MovieItem key={movie.imdbID} movie={movie} />)
      ) : (
        <EmptyMovies />
      )}
    </div>
  );
};

export const MovieItem = ({ movie }: { movie: IMovie }) => {
  return (
    <div className="movie-item">
      <h5>{movie.Title}</h5>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt={movie.Title} />
    </div>
  );
};

const EmptyMovies = () => {
  return <p>No hay peliculas</p>;
};

export default MovieList;
