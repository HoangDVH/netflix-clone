import { TMDB_V3_API_KEY } from "../constant";
import { MovieDetail } from "../types/Movie";
import { movieApi } from "./movie";

export const extendedApi = movieApi.injectEndpoints({
  endpoints: (build) => ({
    getSearchMovie: build.query<MovieDetail, string>({
      query: (searchInput) => ({
        url: `search/movie?query=${searchInput}&api_key=38bb6c17a8dc572b53d072d8b039adb7`,
       
      }),
    }),

   
  }),
});

export const {
  useGetSearchMovieQuery
 
} = extendedApi;
