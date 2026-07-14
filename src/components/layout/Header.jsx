import NavMenu from './NavMenu';

const Header = () => {
    return (
        <header className="header">
            <img src="./images/get_fluent_logo.svg" alt="logo" height="125" width="125" />
            <NavMenu />
        </header>
    );
};

export default Header;