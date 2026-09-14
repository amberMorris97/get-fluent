import { useState, useEffect, useContext, use } from "react";
import { useNavigate } from "react-router";
import { DataContext } from "../../../context/DataContext";
import QuizCard from "./QuizCard";
import Button from "../../common/Button";
import { checkAnswer } from "./util/checkAnswer";
import { shuffle } from "./util/shuffle";
import { ModalContext } from "../../../context/ModalContext";

const QuizPage = () => {
    const navigate = useNavigate();
    const { userFlashcards, isLoading, submitQuizScore } = useContext(DataContext);
    const { handleOpenModal } = useContext(ModalContext);

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [showNext, setShowNext] = useState(false);
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        if (userFlashcards) {
            setQuestions(shuffle(userFlashcards).slice(0, 10));
        }
    }, [userFlashcards]);

    const modalContent = () => {
        const { phrase } = questions[currentIndex];
        const questionInfo = `${phrase.haitianCreole} means ${phrase.english}`;

        return ( <p>{questionInfo}</p> );
    };

    const handleStartQuiz = () => {
        setQuizStarted(true);
        setCurrentIndex(0);
    };

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const handleNextQuestion = async () => {
        if (currentIndex === questions.length - 1) {
            setSubmitting(true);
            setSubmitError(null);
            try {
                await submitQuizScore(score, questions.length);
                navigate('/quizResults', { state: { score, total: questions.length } });
            } catch(error) {
                setSubmitError("Couldn't save your score. Please try again.");
                console.error(error)// TODO: Give user feedback
            } 
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
            handleOpenModal(modalContent, 'CORRECT', 'quiz');
            setScore(prev => prev + 1); 
        } else {
            handleOpenModal(modalContent, 'WRONG', 'quiz');
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
                    submitting={submitting}
                />
            )}
        </div>
    );
};

export default QuizPage;