 
import Hero from './Hero/Hero';
import Slider from './Slider/Slider';
import TopContest from './TopContest/TopContest';
import TopCreator from './TopCreator/TopCreator';

const Home = () => {
    return (
        <div>
            <Hero/>
            <TopContest></TopContest>
            <TopCreator></TopCreator>
            <Slider/>
        </div>
    );
};

export default Home;