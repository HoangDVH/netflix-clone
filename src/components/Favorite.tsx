// Existing imports...

import { useSelector } from "react-redux";
import { RootState } from "../store/store"; // Adjust the path as per your project structure
import { useState } from "react";
import { Movie } from "../types/Movie";
import { MoviePopup } from "./MoviePopup";
import { IMAGE_URL } from "./VideoSlider";
import { NavBar } from "./navbar/NavBar";

// Existing code...

export const Favorite = () => {
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
  const favorItems = useSelector((state: RootState) => state.favorite.movies);
  

  return (
    <>
      <NavBar />
      <p className="text-white mt-28  mx-8 md:mx-16 text-3xl mb-20">My List</p>
      <div className="grid grid-cols-2 md:grid-cols-6 mx-8 md:mx-16 gap-3 -mt-20">
        {favorItems.map((item, index) => (
          <div
            className="-mb-40"
            onMouseEnter={() => setHoveredMovie(item)}
            onMouseLeave={() => setHoveredMovie(null)}
            key={index}
          >
            {hoveredMovie === item ? (
              <div className="w-96 -translate-x-20 hover:bg-slate-200">
                <MoviePopup movie={item} />
              </div>
            ) : (
              <img
                src={`${IMAGE_URL}${item.backdrop_path}`}
                alt="poster"
                className="object-contain h-80 w-full visible hover:invisible"
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
