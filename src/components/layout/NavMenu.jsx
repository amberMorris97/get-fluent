import { Link } from "react-router";

const NavMenu = () => {
    return (
        <div>
            <Link to="/">
              Get Fluent
            </Link>
            <Link to="/">
              Contact
            </Link>
            <Link to="/">
              About
            </Link>
            <Link to="/flashcards">
              Flashcards
            </Link>
        </div>
    );
};

export default NavMenu;