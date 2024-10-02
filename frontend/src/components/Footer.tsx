// src/components/Footer.tsx

import React from 'react';
import styles from '../styles/Footer.module.scss'; // Adjust path as necessary

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} SPEED. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
