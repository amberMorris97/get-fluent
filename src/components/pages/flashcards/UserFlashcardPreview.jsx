import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import Card from "../../common/Card";

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
            <Card
                type="preview"
                phrase={flashcard.phrase}
                onClick={handleStatusClick}
                onIconClick={handleDeleteFlashcard}
                flashcardId={flashcard.flashcardId}
            />
        </div>
    );
};

export default UserFlashcardPreview;