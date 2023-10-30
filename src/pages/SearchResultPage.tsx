import { useSearchParams } from "react-router-dom";
import { useGetSearchMovieQuery } from "../apis/search";
import { useState } from "react";
import { MoviePopup } from "../components/MoviePopup";
import { IMAGE_URL } from "../components/VideoSlider";
import { NavBar } from "../components/navbar/NavBar";
import { Movie } from "../types/Movie";
export const SearchResultPage = () => {
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const { data } = useGetSearchMovieQuery(q);
  return (
    <div>
      <NavBar />
      <p></p>
      <div className="grid grid-cols-2 md:grid-cols-6 mx-8 md:mx-16 gap-3 my-36">
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
    </div>
  );
};
