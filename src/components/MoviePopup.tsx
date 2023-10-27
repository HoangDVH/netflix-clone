import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Movie } from "../types/Movie";
import { IMAGE_URL } from "./VideoSlider";

import NetflixIconButton from "./NetflixIconButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AgeLimitChip from "./AgeLimitChip";
import { formatMinuteToReadable, getRandomNumber } from "../utils/common";
import QualityChip from "./QualityChip";

import DetailModal from "./DetailMovieModal/DetailModalHeader";
import { useNavigate } from "react-router-dom";
interface PopProps {
  movie: Movie;
}
export const MoviePopup = (props: PopProps) => {
  const { movie } = props;
  console.log("movie", movie);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    navigate(`/${movie.id}`);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card>
        <div className="object-cover relative">
          <CardMedia
            component="img"
            alt="green iguana"
            src={`${IMAGE_URL}${movie.backdrop_path}`}
            className="h-40"
          />
        </div>
        <CardContent>
          <div className="text-lg absolute top-32 left-1 line-clamp-1">
            <Typography gutterBottom component="div">
              <div className="font-semibold">{movie.title}</div>
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <NetflixIconButton size="small">
                <PlayCircleIcon
                  fontSize="large"
                  onClick={() => navigate(`/${movie?.id}/watch`)}
                />
              </NetflixIconButton>
              <NetflixIconButton>
                <AddIcon />
              </NetflixIconButton>
              <NetflixIconButton>
                <ThumbUpOffAltIcon />
              </NetflixIconButton>
              <Box flexGrow={1} />
              <div onClick={handleClickOpen}>
                <NetflixIconButton sx={{ zIndex: 2, marginLeft: 10 }}>
                  <KeyboardArrowDownIcon />
                </NetflixIconButton>
              </div>
            </Stack>
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="subtitle1"
              sx={{ color: "success.main" }}
            >{`${getRandomNumber(100)}% Match`}</Typography>

            <AgeLimitChip label={`${getRandomNumber(20)}+`} />
            <Typography variant="subtitle2">{`${formatMinuteToReadable(
              getRandomNumber(180)
            )}`}</Typography>
            <QualityChip label="HD" />
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            {}
          </Stack>
        </CardContent>
      </Card>
      <DetailModal open={open} handleClose={handleClose} />
    </div>
  );
};
