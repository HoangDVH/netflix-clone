import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Box from "@mui/material/Box";
import VideoJSPlayer from "../VideoJSPlayer";
import Player from "video.js/dist/types/player";
import { useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMovieVideoQuery } from "../../apis/movieDetail";
import MaxLineTypography from "../MaxLineTypography";
import NetflixIconButton from "../NetflixIconButton";
import PlayButton from "../PlayButton";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Stack from "@mui/material/Stack";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import Container from "@mui/material/Container";
import { DetailModalBody } from "./DetailModalBody";
import { SimilarVideo } from "../SimilarVideo";
import Grid from "@mui/material/Grid";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
interface DetailModalProp {
  open: boolean;
  handleClose: () => void;
}
export default function DetailModal(props: DetailModalProp) {
  const { open, handleClose } = props;

  const { movieId } = useParams();
  const navigate = useNavigate();
  console.log("detailid", movieId);
  const { data } = useGetMovieVideoQuery(movieId);
  console.log("detaidata", data);

  const playerRef = useRef<Player | null>(null);
  const [muted, setMuted] = useState(true);

  const handleReady = useCallback((player: Player) => {
    playerRef.current = player;
    setMuted(player.muted());
  }, []);

  const handleMute = useCallback((status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);

  const handleCloseModal = () => {
    navigate("/browse");
    handleClose();
  };

  return (
    <>
      {data && (
        <div>
          <BootstrapDialog
            fullWidth
            scroll="body"
            maxWidth="md"
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle
              sx={{ m: 2, p: 2 }}
              id="customized-dialog-title"
            ></DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                right: 8,
                top: 5,

                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              sx={{
                top: 0,
                left: 0,
                right: 0,
                position: "relative",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  height: "calc(9 / 16 * 100%)",
                }}
              >
                <VideoJSPlayer
                  options={{
                    loop: true,
                    autoplay: true,
                    controls: false,
                    responsive: true,
                    fluid: true,
                    techOrder: ["youtube"],
                    sources: [
                      {
                        type: "video/youtube",
                        src:
                          `https://www.youtube.com/watch?v=${data?.results[0].key}` ||
                          "L3oOldViIgY",
                      },
                    ],
                  }}
                  onReady={handleReady}
                />

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
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 16,
                    px: { xs: 2, sm: 3, md: 5 },
                  }}
                >
                  <MaxLineTypography variant="h4" maxLine={1} sx={{ mb: 2 }}>
                    {}
                  </MaxLineTypography>
                  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <PlayButton sx={{ color: "white", py: 0 }} />
                    <NetflixIconButton>
                      <AddIcon />
                    </NetflixIconButton>
                    <NetflixIconButton>
                      <ThumbUpOffAltIcon />
                    </NetflixIconButton>
                    <Box flexGrow={1} />
                    <NetflixIconButton
                      size="large"
                      onClick={() => handleMute(muted)}
                      sx={{ zIndex: 2 }}
                    >
                      {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                    </NetflixIconButton>
                  </Stack>

                  <Container
                    sx={{
                      p: "0px !important",
                    }}
                  >
                    <DetailModalBody />
                  </Container>
                </Box>
              </Box>
              <Grid container spacing={2}>
                <div className="mt-10 mx-14 text-lg font-bold">
                  Similar Movies
                </div>
                <SimilarVideo />
              </Grid>
            </Box>

            <DialogActions></DialogActions>
          </BootstrapDialog>
        </div>
      )}
    </>
  );
}
