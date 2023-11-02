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

import { useNavigate } from "react-router-dom";

import "netslider/dist/styles.min.css";
import { Skeleton } from "@mui/material";
interface titleProps {
  title: string;
}

export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
export const VideoSlider = (props: titleProps) => {
  const navigate = useNavigate();

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
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="mt-5 md:mt-52 mb-12 md:-mb-40 px-8 md:px-16 ">
      <div className="">
        <div className="text-2xl text-white py-4 capitalize font-bold cursor-pointer group/item flex w-96">
          {title} Movies
          <div
            className="group/edit invisible group-hover/item:visible group-hover/item:translate-x-4 transition-transform duration-300 ease-in-out"
            onClick={() => {
              navigate(`/genre/${title}`);
            }}
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
            <div key={movie.id} className="relative">
              <SwiperSlide>
                <div className="group">
                  <img
                    src={`${IMAGE_URL}${movie.poster_path}`}
                    alt="poster"
                    className="object-contain h-60 w-full"
                  />
                  <div className="opacity-0 group-hover:opacity-100 md:h-96 h-36 md:w-full w-5 z-10 absolute top-0 left-0 flex items-center justify-center transition-opacity duration-300 md:-translate-y-6 translate-y-12 hover:scale-125">
                    <MoviePopup movie={movie} />
                  </div>
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
