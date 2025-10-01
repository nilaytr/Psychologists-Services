import { useNavigate } from 'react-router-dom';
import background from '../../assets/homePhoto.png';
import css from './Home.module.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <img src={background} alt="background" />
                <img src="/icons/block.svg" alt="block" />
                <img src="/icons/Group.svg" alt="group" />
                <div className={css.rectangleStack}>
                    <img src="/icons/Rectangle.svg" alt="rectangle" />
                    <img src="/icons/question.svg" alt="question" />
                </div>
                <h1>The road to the depths of the human soul</h1>
                <p>We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</p>
                <button onClick={() => navigate("/psychologists")}>Get started 🡥</button>
            </div>
        </>
    );
};

export default Home;