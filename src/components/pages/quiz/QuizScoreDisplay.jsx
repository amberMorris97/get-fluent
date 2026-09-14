import { useContext } from "react";
import QuizScore from "./QuizScore";
import { DataContext } from "../../../context/DataContext";

const QuizScoreDisplay = () => {
    const { userQuizScores } = useContext(DataContext);
   
    const renderQuizScore = userQuizScores.map((score) => {
        return <QuizScore key={`${score.id}-quiz-score`} score={score.score} length={score.quizLength} createdAt={score.createdAt} />
    });

    return (
        <div className="quiz-score-display-box">
            {renderQuizScore}
        </div>
    );
};

export default QuizScoreDisplay;