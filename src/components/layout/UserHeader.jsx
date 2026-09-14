import UserNavMenu from "./UserNavMenu";
import Header from "./Header";

const UserHeader = ({ notify, setIsOpen }) => { 
    return ( <Header setIsOpen={setIsOpen} NavMenu={UserNavMenu} notify={notify} /> );
};

export default UserHeader;