import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Nav.module.scss";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        {/* Title with Link */}
        <Link href="/">
          <a className={styles.title}>SPEED</a>
        </Link>

        {/* Hamburger Menu Icon */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </div>

        {/* Navigation Links */}
        <div className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
          {/* Articles Link */}
          <Link href="/articles">
            <a className={styles.navitem}>All Articles</a>
          </Link>

          {/* New Article Link */}
          <Link href="/articles/new">
            <a className={styles.navitem}>New Article</a>
          </Link>

          {/* Admin Dropdown */}
          <div className={styles.adminDropdown}>
            <Link href="#">
              <a className={styles.navitem}>Admin</a>
            </Link>

            {/* Dropdown Content */}
            <div className={styles.adminDropdownContent}>
              <Link href="/admin/dashboard">
                <a>Dashboard</a>
              </Link>
              <Link href="/admin/settings">
                <a>Settings</a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
