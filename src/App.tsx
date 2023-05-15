import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import MovieList from "./componets/MovieList/MovieList";
import "./App.css";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";

function App() {
  const [search, setSearch] = useState<string>("");
  const { movies, loading, fetchMovies } = useMovies();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    fetchMovies(search);
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;

    setSearch(value);
    debouncedGetMovies(value);
  }

  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      fetchMovies(search);
    }, 400),
    [fetchMovies]
  );

  return (
    <div className="App">
      <header className="App-header">
        <h2>Movie Search</h2>
        <form onSubmit={handleSubmit} className="form-search">
          <input
            type="text"
            placeholder="Batman, Matrix, ..."
            onChange={handleOnChange}
            value={search}
          />
          <button>Buscar</button>
        </form>
      </header>
      <main>
        {loading ? <p>Loading....</p> : <MovieList movies={movies} />}
      </main>
    </div>
  );
}

export default App;
