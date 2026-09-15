const QuizScore = ({ createdAt, score, length }) => {
    const isoString = createdAt;
    const regularDate = new Date(isoString).toLocaleDateString();
    return (
        <div className="quiz-score">
            <h4>{regularDate}</h4>
            <h4>{score}/{length}</h4>
        </div>
    );
};

export default QuizScore;