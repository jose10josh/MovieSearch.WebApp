import { useCallback, useRef, useState } from "react";
import { searchMovies } from "../services/movie";


export const useMovies = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const sameSearch = useRef<string>("");
  


  const fetchMovies = useCallback(async (search: string) => {
    if(sameSearch.current === search) return;

    try {
      setLoading(true);
      setError(false);
      const movies = await searchMovies({search});
      if(movies !== null) {
        setMovies(movies);
        sameSearch.current = search;
      }
    } catch (error) {
      setError(true);
      throw new Error("Ocurrio un error");
    } finally {
      setLoading(false);
    }
  },[])


  return {
    movies,
    loading,
    setMovies,
    fetchMovies,
  }
}