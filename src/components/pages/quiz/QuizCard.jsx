import Button from "../../common/Button";
import Input from "../../common/forms/inputs/Input";

const QuizCard = ({ questions, currentIndex, userAnswer, handleInputChange, handleSubmitAnswer, showNext, handleNextQuestion, submitting }) => {
    const { phrase } = questions[currentIndex];
    return (
        <div className="quiz-content-box">
            <h1>Flashcard Quiz</h1>
            <div className="quiz-progress-bar"></div>
            <span>Question: {currentIndex + 1}</span>
            <h3>Type the English translation for:</h3>
            <div className="quiz-ht-phrase">
                <h2>{phrase.haitianCreole}</h2>
            </div>
            <Input
                id={`${questions[currentIndex].id}-question-user-input`}
                type="textarea"
                label="Type your answer here..."
                value={userAnswer}
                handleChange={handleInputChange}
                classes="question-answer-input"
            />
            <Button 
                label={showNext ? "Next" : "Submit Answer"}
                onClick={showNext ? handleNextQuestion : handleSubmitAnswer}
                disabled={submitting}
                className="btn"
            />
        </div>
    );
};

export default QuizCard;