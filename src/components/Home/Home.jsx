import { useNavigate } from 'react-router-dom';
import background from '../../assets/homePhoto.png';
import css from './Home.module.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={css.homeWrapper}>
                <div className={css.textWrapper}>
                    <h1>The road to the <span>depths</span> of the human soul</h1>
                    <h3>We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</h3>
                    <button type="button" className={css.homeButton} onClick={() => navigate("/psychologists")}>Get started  🡥</button>
                </div>
                <div className={css.imgWrapper}>
                    <img src={background} alt="background" className={css.bgPicture} />
                    <img src="/icons/block.svg" alt="block" className={css.block} />
                    <img src="/icons/Group.svg" alt="group" className={css.group} />
                    <div className={css.rectangleStack}>
                        <img src="/icons/Rectangle.svg" alt="rectangle" />
                        <img src="/icons/question.svg" alt="question" className={css.question} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;