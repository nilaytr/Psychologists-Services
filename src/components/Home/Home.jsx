import { useNavigate } from 'react-router-dom';
import background from '../../assets/homePhoto.png';
import block from '../../assets/block.png';
import group from '../../assets/Group.png';
import Rectangle from '../../assets/Rectangle.png';
import question from '../../assets/question.png';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <img src={background} alt="background" />
                <img src={block} alt="block" />
                <img src={group} alt="group" />
                <img src={Rectangle} alt="Rectangle" />
                <img src={question} alt="question" />
                <h1>The road to the depths of the human soul</h1>
                <p>We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</p>
                <button onClick={() => navigate("/psychologists")}>Get started 🡥</button>
            </div>
        </>
    );
};

export default Home;