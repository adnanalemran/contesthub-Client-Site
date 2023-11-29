import Hero from "./Hero/Hero";
import Slider from "./Slider/Slider";
import TopContest from "./TopContest/TopContest";
import TopCreator from "./TopCreator/TopCreator";

const Home = () => {
  return (
    <div className="container overflow-hidden">
      <Hero />
      <TopContest></TopContest>
      <Slider /> 
      <TopCreator></TopCreator>
    </div>
  );
};

export default Home;
