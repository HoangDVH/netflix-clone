import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useGetMovieSimilarQuery } from "../apis/movieDetail";
import { IMAGE_URL } from "./VideoSlider";
import Stack from "@mui/material/Stack";
import AgeLimitChip from "./AgeLimitChip";
import { getRandomNumber } from "../utils/common";
import NetflixIconButton from "./NetflixIconButton";
import AddIcon from "@mui/icons-material/Add";
export const SimilarVideo = () => {
  const { movieId } = useParams();

  const { data } = useGetMovieSimilarQuery(movieId);
 
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ml-14 mr-10 my-10">
      {data?.results.map((item) => (
        <Card key={item.id} sx={{ maxWidth: 345 }}>
          <div className="relative">
            <CardMedia
              component="img"
              alt="green iguana"
              image={`${IMAGE_URL}${item.poster_path}`}
              className="h-40 md:h-52 w-full"
            />
            <CardContent>
              <div className="absolute bottom-48 left-1 line-clamp-1">
                <Typography component="div">
                  <p className="text-sm font-bold">{item.original_title}</p>
                </Typography>
              </div>

              <Stack direction="row" alignItems="center">
                <div>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "success.main" }}
                  >{`${getRandomNumber(100)}% Match`}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AgeLimitChip label={`${getRandomNumber(20)}+`} />
                    <Typography variant="body2">
                      {item.release_date.substring(0, 4)}
                    </Typography>
                  </Stack>
                </div>
                <div style={{ flexGrow: 1 }} />
                <NetflixIconButton>
                  <AddIcon />
                </NetflixIconButton>
              </Stack>

              <Typography className="line-clamp-3 pt-5">
                {item.overview}
              </Typography>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};
