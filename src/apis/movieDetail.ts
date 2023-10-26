import { TMDB_V3_API_KEY } from "../constant";
import { MovieDetail } from "../types/Movie";
import { movieApi } from "./movie";

export const extendedApi = movieApi.injectEndpoints({
  endpoints: (build) => ({
    getMovieVideo: build.query<MovieDetail, number>({
      query: (movieId) => ({
        url: `movie/${movieId}/videos`,
        params: { api_key: TMDB_V3_API_KEY },
      }),
    }),

    getMovieSimilar: build.query<MovieDetail, number>({
      query: (movieId) => ({
        url: `movie/${movieId}/similar`,
        params: { api_key: TMDB_V3_API_KEY },
      }),
    }),

    getMovieDetail: build.query<MovieDetail, number>({
      query: (movieId) => ({
        url: `movie/${movieId}`,
        params: { api_key: TMDB_V3_API_KEY },
      }),
    }),

    getAppendedVideos: build.query<
      MovieDetail,
      {id: number }
    >({
      query: ({ id }) => ({
        url: `movie/${id}`,
        params: { api_key: TMDB_V3_API_KEY, append_to_response: "videos" },
      }),
    }),
  }),
});

export const {
  useGetMovieVideoQuery,
  useGetMovieSimilarQuery,
  useGetMovieDetailQuery,
  useLazyGetAppendedVideosQuery,
} = extendedApi;
