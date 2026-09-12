import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserFlashcardPreview = ({ flashcard }) => {
    console.log(flashcard)
    return (
        <div className="user-flashcard-preview">
            <FontAwesomeIcon icon="fa-solid fa-trash" />
            <h2>{flashcard.phrase.haitianCreole}</h2>
            <h3>{flashcard.phrase.english}</h3>
            <h5 className="phrase-pronunciation">{flashcard.phrase.pronunciation}</h5>
            <div className="flashcard-status-box">
                <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                <h6>Mastered</h6>
                <FontAwesomeIcon icon="fa solid fa-circle-xmark" />
                <h6>Needs Work</h6>
            </div>
        </div>
    );
};

export default UserFlashcardPreview;