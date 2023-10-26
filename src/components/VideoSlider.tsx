import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// import required modules
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Movie } from "../types/Movie";

import {
  useGetMovieNowPlayingQuery,
  useGetMoviePopularQuery,
  useGetMovieUpComingQuery,
  useGetMovieTopRateQuery,
} from "../apis/movie";

import { MoviePopup } from "./MoviePopup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface titleProps {
  title: string;
}

export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
export const VideoSlider = (props: titleProps) => {
  const navigate = useNavigate();
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
  const { title } = props;

  let data, isFetching;
  if (title === "popular") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ({ data, isFetching } = useGetMoviePopularQuery());
  } else if (title === "top rated") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ({ data, isFetching } = useGetMovieTopRateQuery());
  } else if (title === "now playing") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ({ data, isFetching } = useGetMovieNowPlayingQuery());
  } else if (title === "upcoming") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ({ data, isFetching } = useGetMovieUpComingQuery());
  }

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="mt-48 -mb-40 px-16 ">
      <div className="">
        <div className="text-2xl text-white py-4 capitalize font-bold cursor-pointer group/item flex w-96">
          {title} Movies
          <div
            className="group/edit invisible group-hover/item:visible group-hover/item:translate-x-4 transition-transform duration-300 ease-in-out"
            onClick={() => navigate(`/genre/${title}`)}
          >
            <span className="text-xl text-green-400 py-4 capitalize font-bold hover:cursor-pointer">
              Explore All
            </span>
          </div>
        </div>
      </div>

      <div className="">
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            412: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
        >
          {data.results.map((movie: Movie) => (
            <div key={movie.id} className="">
              <SwiperSlide>
                <div
                  className=""
                  onMouseEnter={() => setHoveredMovie(movie)}
                  onMouseLeave={() => setHoveredMovie(null)}
                >
                  {hoveredMovie === movie ? (
                    <div className="h-96 w-96 -translate-x-28">
                      <MoviePopup movie={movie} />
                    </div>
                  ) : (
                    <img
                      src={`${IMAGE_URL}${movie.backdrop_path}`}
                      alt="poster"
                      className="object-contain h-80 w-full hover:invisible"
                    />
                  )}
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
