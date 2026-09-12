import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserProfilePage = () => {
    const { auth } = useContext(AuthContext);
    return (
        <div>User Profile Page</div>
    );
};

export default UserProfilePage;