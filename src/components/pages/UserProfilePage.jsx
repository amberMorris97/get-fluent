import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserProfilePage = () => {
    const { auth } = useContext(AuthContext);
    console.log(auth);
    return (
        <div>User Profile Page</div>
    );
};

export default UserProfilePage;