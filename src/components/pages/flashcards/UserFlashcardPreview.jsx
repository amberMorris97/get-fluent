const UserFlashcardPreview = ({ flashcard }) => {
    console.log(flashcard)
    return (
        <div className="user-flashcard-preview">
            <div>{flashcard.phrase.haitianCreole}</div>
            <div>{flashcard.phrase.english}</div>
            <div>{flashcard.phrase.pronunciation}</div>
            <div>
                <h6>Mastered</h6>
                <h6>Needs Work</h6>
            </div>
        </div>
    );
};

export default UserFlashcardPreview;