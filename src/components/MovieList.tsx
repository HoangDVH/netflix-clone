import { useParams } from "react-router-dom";
import {
  useGetMovieNowPlayingQuery,
  useGetMoviePopularQuery,
  useGetMovieTopRateQuery,
  useGetMovieUpComingQuery,
} from "../apis/movie";
import { IMAGE_URL } from "./VideoSlider";
import { MoviePopup } from "./MoviePopup";
import { useState } from "react";
import { Movie } from "../types/Movie";
import { useGetSearchMovieQuery } from "../apis/search";

export const MovieList = () => {
  const { title } = useParams();
  const { searchInput } = useParams();
  console.log("seapr", searchInput);
  const { data: search } = useGetSearchMovieQuery(searchInput);
  console.log("search:", search);
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
  let data;
  if (title === "popular") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ({ data } = useGetMoviePopularQuery());
  } else if (title === "top rated") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ({ data } = useGetMovieTopRateQuery());
  } else if (title === "now playing") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ({ data } = useGetMovieNowPlayingQuery());
  } else if (title === "upcoming") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ({ data } = useGetMovieUpComingQuery());
  }

  return (
    <div>
      <p className="text-white mt-36 mb-5 mx-8 md:mx-16 capitalize text-2xl">
        {title} Movies
      </p>
      <div className="grid grid-cols-2 md:grid-cols-6 mx-8 md:mx-16 gap-3">
        {data?.results.map((movie) => {
          return (
            <div
              className="-mb-40"
              onMouseEnter={() => setHoveredMovie(movie)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {hoveredMovie === movie ? (
                <div className="w-96 -translate-x-20 hover:bg-slate-200">
                  <MoviePopup movie={movie} />
                </div>
              ) : (
                <img
                  src={`${IMAGE_URL}${movie.backdrop_path}`}
                  alt="poster"
                  className="object-contain h-80 w-full visible hover:invisible"
                />
              )}
            </div>
          );
        })}
      </div>
      {search && (
        <div className="grid grid-cols-2 md:grid-cols-6 mx-8 md:mx-16 gap-3">
          {search?.results.map((movies) => {
            return (
              <div
                className="-mb-40"
                onMouseEnter={() => setHoveredMovie(movies)}
                onMouseLeave={() => setHoveredMovie(null)}
              >
                {hoveredMovie === movies ? (
                  <div className="w-96 -translate-x-20 hover:bg-slate-200">
                    <MoviePopup movie={movies} />
                  </div>
                ) : (
                  <img
                    src={`${IMAGE_URL}${movies.backdrop_path}`}
                    alt="poster"
                    className="object-contain h-80 w-full visible hover:invisible"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
