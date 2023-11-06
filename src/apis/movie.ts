import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieDetail } from "../types/Movie";
import { API_ENDPOINT_URL, TMDB_V3_API_KEY } from "../constant";
// Define a service using a base URL and expected endpoints
export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_ENDPOINT_URL}`,
  }),
  endpoints: (build) => ({
    getMoviePopular: build.query<MovieDetail, void>({
      query: () => ({
        url: "movie/popular",
        params: { api_key: TMDB_V3_API_KEY },
      }),
    }),

    getMovieTopRate: build.query<MovieDetail, void>({
      query: () => ({
        url: "movie/top_rated",
        params: { api_key: TMDB_V3_API_KEY },
      }),
    }),

    getMovieNowPlaying: build.query<MovieDetail, void>({
      query: () => ({
        url: "movie/now_playing",
        params: { api_key: TMDB_V3_API_KEY },
      }),
    }),

    getMovieUpComing: build.query<MovieDetail, void>({
      query: () => ({
        url: "movie/upcoming",
        params: { api_key: TMDB_V3_API_KEY },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMoviePopularQuery,
  useGetMovieTopRateQuery,
  useGetMovieNowPlayingQuery,
  useGetMovieUpComingQuery,
} = movieApi;
