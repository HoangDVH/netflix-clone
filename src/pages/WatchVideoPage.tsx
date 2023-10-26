import Box from "@mui/material/Box";
import VideoPlayer from "../components/VideoPlayer";
import { WatchVideo } from "../components/WatchVideo";
import { NavBar } from "../components/navbar/NavBar";
import PlayerControlButton from "../components/PlayerControlButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

export const WatchVideoPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/browse");
  };

  return (
    <div className="">
      <NavBar />
      <Box
        sx={{
          position: "relative",
        }}
      >
        <WatchVideo />
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
          }}
        >
          <Box px={2} sx={{ position: "absolute", top: 75 }}>
            <PlayerControlButton onClick={handleGoBack}>
              <KeyboardBackspaceIcon />
            </PlayerControlButton>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
