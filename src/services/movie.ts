import { API } from "../constants/API";


type Props = {
  search:string
}
export const searchMovies = async ({search}:Props):Promise<IMovie[]|null> => {
  if (search === '') return null

  try {
    const response = await fetch(`${API}&s=${search}`);
    const data = await response.json();
    return data.Search
  } catch (error) {
    throw new Error('Ocurrio un error');
  }
}