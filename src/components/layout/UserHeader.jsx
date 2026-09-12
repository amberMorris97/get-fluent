import UserNavMenu from "./UserNavMenu";
import Header from "./Header";

const UserHeader = ({ setIsOpen }) => { 
    return ( <Header setIsOpen={setIsOpen} NavMenu={UserNavMenu} /> );
};

export default UserHeader;