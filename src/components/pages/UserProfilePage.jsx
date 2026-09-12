import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Button from "../common/Button";

const UserProfilePage = () => {
    const { auth } = useContext(AuthContext);
    const { userFlashcards } = useContext(DataContext);
    
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
            </div>
        </section>
    );
};

export default UserProfilePage;