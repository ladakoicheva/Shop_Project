import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Autorisation } from '../Autorisation/Authorise/Autorisation';
import { useState } from 'react';
import { useAppSelector } from '../../redux/type';
import BasketIcon from './BasketIcon';
import { BagIcon, UserIcon, MenuIcon, CloseIcon } from '../../utils/svgIcons';

export default function Header() {
  const { user, isAdmin } = useAppSelector((s) => s.auth);
  const { isLoadingApp } = useAppSelector((s) => s.loading);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        {/* Brand Logo */}
        <Link
          to={user?.uid ? `/products/${user.uid}` : '/'}
          className={styles.brandLogo}
          onClick={closeMobile}
        >
          <span className={styles.logoIcon}>
            <BagIcon size={22} color="#ffffff" />
          </span>
          <span className={styles.logoText}>Shop</span>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          className={styles.hamburgerBtn}
          onClick={toggleMobile}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <CloseIcon size={24} color="#0f172a" /> : <MenuIcon size={24} color="#0f172a" />}
        </button>

        {/* Main Navigation Links */}
        <div className={`${styles.mainNav} ${mobileOpen ? styles.mobileNavOpen : ''}`}>
          {!isLoadingApp && !isAdmin && user && (
            <>
              <Link
                to={`/products/${user.uid}`}
                className={`${styles.navLink} ${
                  location.pathname.startsWith('/products') ? styles.activeLink : ''
                }`}
                onClick={closeMobile}
              >
                Мои товары
              </Link>
              <Link
                to="/add"
                className={`${styles.navLink} ${
                  location.pathname === '/add' ? styles.activeLink : ''
                }`}
                onClick={closeMobile}
              >
                Добавить товар
              </Link>
              <Link
                to="/profile"
                className={`${styles.navLink} ${
                  location.pathname === '/profile' ? styles.activeLink : ''
                }`}
                onClick={closeMobile}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <UserIcon size={18} />
                <span>Профиль</span>
              </Link>
            </>
          )}
        </div>

        {/* User Actions Right */}
        <div className={styles.userActions}>
          <Autorisation />
          {!isAdmin && !isLoadingApp && <BasketIcon />}
        </div>
      </nav>
    </header>
  );
}
