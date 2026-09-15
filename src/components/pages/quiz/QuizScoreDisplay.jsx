import { useContext } from "react";
import { useNavigate } from "react-router";
import QuizScore from "./QuizScore";
import { DataContext } from "../../../context/DataContext";
import Button from "../../common/Button";

const QuizScoreDisplay = () => {
    const { userQuizScores } = useContext(DataContext);

    const navigate = useNavigate();
   
    const renderQuizScore = userQuizScores?.reverse().map((score) => {
        return <QuizScore key={`${score.id}-quiz-score`} score={score.score} length={score.quizLength} createdAt={score.createdAt} />
    });

    const handleTakeQuiz = () => {
        navigate('/quiz');
    };

    return (
        <div className="quiz-score-display-box">
            {renderQuizScore}
            <Button
              label="Take Quiz"
              onClick={handleTakeQuiz}
            />
        </div>
    );
};

export default QuizScoreDisplay;