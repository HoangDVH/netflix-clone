import Player from "video.js/dist/types/player";
import InfoIcon from "@mui/icons-material/Info";

import VideoJSPlayer from "../VideoJSPlayer";
import { useRef, useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import NetflixIconButton from "../NetflixIconButton";
import Stack from "@mui/material/Stack";

import { useGetMoviePopularQuery } from "../../apis/movie";
import MaturityRate from "../MaturityRate";

import { getRandomNumber } from "../../utils/common";
import { Movie } from "../../types/Movie";
import { useLazyGetAppendedVideosQuery } from "../../apis/movieDetail";
import { useNavigate } from "react-router-dom";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DetailModal from "../DetailMovieModal/DetailModalHeader";
import useOffSetTop from "../../hooks/useOffSetTop";
export const Trailer = () => {
  const navigate = useNavigate();
  const [getVideoDetail, { data: detail }] = useLazyGetAppendedVideosQuery();
  const [video, setVideo] = useState<Movie | null>(null);
  const [muted, setMuted] = useState(true);
  const playerRef = useRef<Player | null>(null);
  const isOffset = useOffSetTop(window.innerWidth * 0.5625);
  const { data, isFetching } = useGetMoviePopularQuery();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (playerRef.current) {
      if (isOffset) {
        playerRef.current.pause();
      } else {
        if (playerRef.current.paused()) {
          playerRef.current.play();
        }
      }
    }
  }, [isOffset]);

  useEffect(() => {
    if (data && data.results) {
      const videos = data.results.filter((item) => !!item.backdrop_path);
      setVideo(videos[getRandomNumber(videos.length)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (video) {
      getVideoDetail({ id: video.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

  const maturityRate = useMemo(() => {
    return getRandomNumber(20);
  }, []);
  if (isFetching) {
    return <div>Loading...</div>;
  }
  console.log("trailer", data);

  const handleReady = (player: Player) => {
    playerRef.current = player;
  };

  const handleMute = (status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  };

  const handleMoreInfo = () => {
    navigate(`/${video.id}`);
    handleClickOpen();
  };

  console.log("video trailer", detail);
  return (
    <>
      return (
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            mb: 3,
            pb: "40%",
            top: 0,
            left: 0,
            right: 0,
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "56.25vw",
              position: "absolute",
            }}
          >
            {video && (
              <>
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: "absolute",
                  }}
                >
                  {detail && (
                    <VideoJSPlayer
                      options={{
                        loop: true,
                        muted: true,
                        autoplay: true,
                        controls: false,
                        responsive: true,
                        fluid: true,
                        techOrder: ["youtube"],
                        sources: [
                          {
                            type: "video/youtube",
                            src: `https://www.youtube.com/watch?v=${detail?.videos.results[0].key}`,
                          },
                        ],
                      }}
                      onReady={handleReady}
                    />
                  )}

                  <Box
                    sx={{
                      background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: "26.09%",
                      opacity: 1,
                      position: "absolute",
                      transition: "opacity .5s",
                    }}
                  />
                  <Box
                    sx={{
                      backgroundColor: "transparent",
                      backgroundImage:
                        "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)",
                      backgroundRepeat: "repeat-x",
                      backgroundPosition: "0px top",
                      backgroundSize: "100% 100%",
                      bottom: 0,
                      position: "absolute",
                      height: "14.7vw",
                      opacity: 1,
                      top: "auto",
                      width: "100%",
                    }}
                  />
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      alignItems: "center",
                      position: "absolute",
                      right: 0,
                      bottom: "35%",
                    }}
                  >
                    <NetflixIconButton
                      size="large"
                      onClick={() => handleMute(muted)}
                      sx={{ zIndex: 2 }}
                    >
                      {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                    </NetflixIconButton>
                    <MaturityRate>{`${maturityRate}+`}</MaturityRate>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Stack
                    spacing={4}
                    sx={{
                      bottom: "35%",
                      position: "absolute",
                      left: { xs: "4%", md: "60px" },
                      top: 0,
                      width: "36%",
                      zIndex: 10,
                      justifyContent: "flex-end",
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      {" "}
                      <div className="text-xs md:text-4xl text-white md:pb-5">
                        {video?.title}
                      </div>
                      <div className="text-m md:text-lg text-white line-clamp-2 md:line-clamp-3">
                        {video?.overview}
                      </div>
                    </div>
                    <Stack direction={{ sm: "row" }} spacing={2}>
                      {/* <PlayButton size="large" /> */}
                      <div className="flex gap-2 md:gap-5">
                        <button
                          onClick={() => navigate(`/${video.id}/watch`)}
                          className="bg-white md:w-32 rounded text-m md:text-2xl w-28"
                        >
                          <div className="flex items-center gap-1 md:pl-2 md:py-2 hover:bg-info">
                            <PlayArrowIcon fontSize="large" />
                            <span className="font-semibold">Play</span>
                          </div>
                        </button>

                        <div
                          onClick={handleMoreInfo}
                          className="w-36 md:w-44 text-m md:text-2xl bg-info text-white flex items-center gap-3 pl-1 md:pl-5 rounded cursor-pointer hover:bg-gray-500"
                        >
                          <InfoIcon />
                          <span>More Info</span>
                        </div>
                      </div>
                    </Stack>
                  </Stack>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
      );
      <DetailModal open={open} handleClose={handleClose} />
    </>
  );
};
