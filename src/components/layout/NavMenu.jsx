import { Link } from "react-router";

const NavMenu = () => {
    return (
        <div className="nav-menu">
            <Link to="/">
              Get Fluent
            </Link>
            <Link to="/about">
              About
            </Link>
            <Link to="/flashcards">
              Flashcards
            </Link>
        </div>
    );
};

export default NavMenu;