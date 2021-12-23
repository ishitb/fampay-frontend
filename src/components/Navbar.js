import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={`${styles.navbar}`}>
            <h1 className={`${styles.brand} foreground-dark font-roboto`}>
                fampay
            </h1>
            <img
                src='/assets/images/logo.svg'
                alt='logo'
                className={`${styles.brandImage}`}
            />
        </nav>
    );
};

export default Navbar;
