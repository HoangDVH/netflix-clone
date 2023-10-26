import { formatMinuteToReadable, getRandomNumber } from "../../utils/common";
import QualityChip from "../QualityChip";
import Grid from "@mui/material/Grid";
import AgeLimitChip from "../AgeLimitChip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MaxLineTypography from "../MaxLineTypography";
import { useGetMovieDetailQuery } from "../../apis/movieDetail";
import { useParams } from "react-router-dom";

export const DetailModalBody = () => {
  const { movieId } = useParams();
  const { data, isFetching } = useGetMovieDetailQuery(movieId);
  return (
    <Grid container spacing={5} alignItems="center">
      <Grid item xs={12} sm={6} md={8}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="subtitle1"
            sx={{ color: "success.main" }}
          >{`${getRandomNumber(100)}% Match`}</Typography>
          <Typography variant="body2">{}</Typography>
          <AgeLimitChip label={`${getRandomNumber(20)}+`} />
          <Typography variant="subtitle2">{`${formatMinuteToReadable(
            getRandomNumber(180)
          )}`}</Typography>
          <QualityChip label="HD" />
        </Stack>

        <MaxLineTypography maxLine={3} variant="body1" sx={{ mt: 2 }}>
          {data?.overview}
        </MaxLineTypography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="body2" sx={{ my: 1 }}>
          {`Genres : ${data?.genres.map((g) => g.name).join(", ")}`}
        </Typography>
        <Typography variant="body2" sx={{ my: 1 }}>
          {`Available in : ${data?.spoken_languages
            .map((l) => l.name)
            .join(", ")}`}
        </Typography>
      </Grid>
     
    </Grid>
  );
};
