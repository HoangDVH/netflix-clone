import { useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetMovieVideoQuery } from "../apis/movieDetail";
import VideoJSPlayer from "./VideoJSPlayer";
import Player from "video.js/dist/types/player";

export const WatchVideo = () => {
  const playerRef = useRef<Player | null>(null);
  const [muted, setMuted] = useState(true);
  const { movieId } = useParams();
  const { data } = useGetMovieVideoQuery(movieId);

  const handleReady = useCallback((player: Player) => {
    playerRef.current = player;
    setMuted(player.muted());
  }, []);
  return (
    <div className="">
      <VideoJSPlayer
        options={{
          loop: true,
          autoplay: true,
          controls: true,
          responsive: true,
          fluid: true,
          techOrder: ["youtube"],
          sources: [
            {
              type: "video/youtube",
              src: `https://www.youtube.com/watch?v=${
                data?.results[0]?.key || "L3oOldViIgY"
              }`,
            },
          ],
        }}
        onReady={handleReady}
      />
    </div>
  );
};
