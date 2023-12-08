import { useNavigate, useParams } from "react-router-dom";

import { IMAGE_URL } from "./VideoSlider";

import { useGetMovieDetailQuery } from "../apis/movieDetail";
import { SimilarVideo } from "./SimilarVideo";

export const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const { data, isFetching } = useGetMovieDetailQuery(movieId );

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const convertTime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };


  return (
    <div className="my-28 mx-16">
      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4" key={data.id}>
            <div className="">
              <img
                src={`${IMAGE_URL}${data.poster_path}`}
                alt="moviejk"
                className="w-64 h-96 rounded-md"
              ></img>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-2">
                <p className="text-3xl text-white font-semibold">
                  {data?.original_title}
                </p>
                <p className="text-sm text-slate-50">{}</p>
                <div className="flex gap-1">
                  {data.genres.map((category) => {
                    return (
                      <span className="text-xs text-white bg-red-500 px-2 py-1 rounded-md">
                        {category.name}
                      </span>
                    );
                  })}
                </div>
                <button className="bg-slate-500 px-2 py-2 my-2 w-36 rounded-xl flex justify-center gap-1" onClick={() => navigate(`/movie/${movieId}/watch`)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-xl "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                  Watch Trailer
                </button>
                <p className="text-xl text-white font-semibold pt-5">
                  Overview
                </p>
                <p className="text-white text-lg">{data.overview}</p>
                <div className="flex items-center gap-5 my-5">
                  <div className="flex items-center gap-2">
                    <p className="text-lg text-white font-semibold">Status:</p>
                    <span className="text-base text-white">{data.status}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-lg text-white  font-semibold">
                      Release Date:{" "}
                    </p>
                    <span className="text-base text-white">
                      {data.release_date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-lg text-white  font-semibold">
                      Runtime:{" "}
                    </p>
                    <span className="text-base text-white">
                      {convertTime(data.runtime)}
                    </span>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div className="py-12">
            <p className="text-white text-xl font-semibold mb-4">
              Similar Movies
            </p>

            <SimilarVideo />
          </div>
        </>
      )}
    </div>
  );
};
