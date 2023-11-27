
import { VideoSlider } from "../components/VideoSlider";
import { NavBar } from "../components/navbar/NavBar";
import { Trailer } from "../components/navbar/Trailer";


export const MainPage = () => {
 
 
  return (
    <>
      <NavBar />
      <Trailer />
      <VideoSlider title={"popular"} />
      <VideoSlider title={"top rated"} />
      <VideoSlider title={"now playing"} />
      <VideoSlider title={"upcoming"} />
    </>
  );
};
