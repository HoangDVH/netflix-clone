import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export const LoadingSpiner = () => {
  return (
    <div className="bg-black h-screen ">
      <div className="flex items-center justify-center h-full">
        <Box sx={{ display: "flex" }}>
          <div>
            <CircularProgress color="error" size={70} />
          </div>
        </Box>
      </div>
    </div>
  );
};
