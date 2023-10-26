import Button, { ButtonProps } from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate, useParams } from "react-router-dom";

import { useGetMovieVideoQuery } from "../apis/movieDetail";

export default function PlayButton({ sx, ...others }: ButtonProps) {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { data } = useGetMovieVideoQuery(movieId);
  return (
    <Button
      variant="contained"
      startIcon={
        <PlayArrowIcon
          sx={{
            fontSize: {
              xs: "24px !important",
              sm: "32px !important",
              md: "40px !important",
            },
          }}
        />
      }
      {...others}
      sx={{
        px: { xs: 1, sm: 2 },
        py: { xs: 0.5, sm: 1 },
        fontSize: { xs: 18, sm: 24, md: 28 },
        lineHeight: 1.5,
        fontWeight: "bold",
        whiteSpace: "nowrap",

        textTransform: "capitalize",
        ...sx,
      }}
      onClick={() => navigate(`/${data?.id}/watch`)}
    >
      Play
    </Button>
  );
}
