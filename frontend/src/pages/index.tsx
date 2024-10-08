import React from 'react';
import styles from '../styles/Home.module.scss'; // Ensure you have the corresponding SCSS file

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to SPEED</h1>
        <p>Explore our extensive database of software practice evidence and enhance your development processes.</p>
      </section>

      <section className={styles.features}>
        <h2>Features</h2>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <h3>Comprehensive Data</h3>
            <p>Access a wide range of analyzed software practices across different industries and scales.</p>
          </div>
          <div className={styles.card}>
            <h3>User Friendly</h3>
            <p>Our platform is designed for easy navigation and accessibility to all users, regardless of tech background.</p>
          </div>
          <div className={styles.card}>
            <h3>Community Driven</h3>
            <p>Engage with a community of developers and researchers to share insights and improve practices.</p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Get Started</h2>
        <p>Join the community today to start improving your software development practices.</p>
        <button className={styles.ctaButton}>Sign Up Now</button>
      </section>
    </div>
  );
}
