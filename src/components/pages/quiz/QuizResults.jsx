import { useLocation } from "react-router";

const QuizResults = () => {
    const location = useLocation();
    const { score, total } = location.state;

    return (
        <div>
            <h2>Quiz Results</h2>
            <h3>{score}/{total}</h3>
            <h4>{(score / total) * 10}%</h4>
            <a href="/profile">profile</a>
            <a href="/quiz">take again</a>
        </div>
    );
};

export default QuizResults;