const QuizScore = ({ createdAt, score, length }) => {
    const isoString = createdAt;
    const regularDate = new Date(isoString).toLocaleDateString();
    return (
        <div>
            <h4>{regularDate}</h4>
            <h4>{score}</h4>
        </div>
    );
};

export default QuizScore;