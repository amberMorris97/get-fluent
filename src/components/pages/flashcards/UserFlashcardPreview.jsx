import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import Button from "../../common/Button";

const UserFlashcardPreview = ({ flashcard }) => {
    const { deleteUserFlashcard, updateUserFlashcard } = useContext(DataContext);

    const handleDeleteFlashcard = async () => {
        try {
            await deleteUserFlashcard(flashcard.flashcardId);
        } catch(error) {
            // TODO: handle error gracefully using modal context
            console.error(error);
        }
    };

    const handleStatusClick = async (status) => {
        if (flashcard.status.toLowerCase() === status.toLowerCase()) return;

        try {
            await updateUserFlashcard(status, flashcard.flashcardId);
        } catch (error) {
            // TODO: Give feedback to user
        }
    };
  
    return (
        <div className="user-flashcard-preview">
            <button onClick={handleDeleteFlashcard}>
                <FontAwesomeIcon icon="fa-solid fa-trash" />
            </button>
            <h2>{flashcard.phrase.haitianCreole}</h2>
            <h3>{flashcard.phrase.english}</h3>
            <h5 className="phrase-pronunciation">{flashcard.phrase.pronunciation}</h5>
            <div className="flashcard-status-box">
                <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                <Button
                    label="Mastered"
                    onClick={() => handleStatusClick('MASTERED')}
                    className="status-btn"
                />
                <FontAwesomeIcon icon="fa solid fa-circle-xmark" />
                <Button
                    label="Needs work"
                    onClick={() => handleStatusClick('NEEDS_WORK')}
                    className="status-btn"
                />
            </div>
        </div>
    );
};

export default UserFlashcardPreview;