import { useState, useEffect, useContext, use } from "react";
import { useNavigate } from "react-router";
import { DataContext } from "../../../context/DataContext";
import QuizCard from "./QuizCard";
import Button from "../../common/Button";
import { checkAnswer } from "./util/checkAnswer";
import QuizResults from "./QuizResults";

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}
const QuizPage = () => {
    const navigate = useNavigate();
    const { userFlashcards, isLoading } = useContext(DataContext);

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [showNext, setShowNext] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        if (userFlashcards) {
            setQuestions(shuffle(userFlashcards).slice(0, 10));
        }
    }, [userFlashcards]);

    const handleStartQuiz = () => {
        setQuizStarted(true);
        setCurrentIndex(0);
    };

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const handleNextQuestion = () => {
        if (currentIndex === questions.length - 1) {
            navigate('/quizResults', { state: { score, total: questions.length } });
        } else {
            setCurrentIndex(currentIndex + 1);
            setUserAnswer('');
            setShowNext(false);
        }
    };

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        if (checkAnswer(userAnswer, questions[currentIndex].phrase.english)) {
            // TODO: add user feedback (CORRECT modal)
            setFeedback('correct');
            console.log(feedback);
            setScore(prev => prev + 1); 
        } else {
            setFeedback('wrong');
            console.log(feedback);
        }

        setShowNext(true);
    };

    if (isLoading) {
        return (
            // TODO: Implement loading spinner
            <div>Loading...</div>
        );
    };

    return (
        <div className="quiz-page">
            Quiz Page
            {!quizStarted ? (
                <Button label="Start Quiz" onClick={handleStartQuiz} />
            ) : (
                <QuizCard 
                    questions={questions}
                    currentIndex={currentIndex}
                    handleInputChange={handleInputChange}
                    handleSubmitAnswer={handleSubmitAnswer}
                    handleNextQuestion={handleNextQuestion}
                    showNext={showNext}
                    userAnswer={userAnswer}
                />
            )}
        </div>
    );
};

export default QuizPage;