import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Button from "../common/Button";
import UserFlashcardPreview from "./flashcards/UserFlashcardPreview";

const UserProfilePage = () => {
    const { auth } = useContext(AuthContext);
    const { userFlashcards, isFlashcardsLoading } = useContext(DataContext);

    if (isFlashcardsLoading) {
        return <div>Loading...</div>
    }

    const flashcardsDisplay = userFlashcards.map((flashcard) => {
        return <UserFlashcardPreview flashcard={flashcard} />
    });
    
    return (
        <section className="user-profile-page">
            <div className="user-profile-content-box">
                <div className="user-profile-content-box-btns">
                    <Button 
                    label="All"
                    />
                    <Button 
                    label="Newest"
                    />
                    <Button 
                    label="Mastered"
                    />
                    <Button 
                    label="Needs Review"
                    />
                </div>
                <div className="user-flashcards-box">
                    {flashcardsDisplay}
                </div>
            </div>
        </section>
    );
};

export default UserProfilePage;