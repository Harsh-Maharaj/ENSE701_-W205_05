// src/components/Home.jsx
import React from "react";
import styles from '../styles/Home.module.scss'; // Adjust the import path

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to SPEED</h1>
      <p>Welcome to the SPEED web application. Use the navigation bar to navigate around the website to view articles or submit a new one.</p>
      <section className={styles.section}>
        <h2>About SPEED</h2>
        <p>I am passionate about Evidence-based software engineering and I want to support developers’ decisions about the use of different practices based on evidence and experience rather than possibly unsubstantiated claims.</p>
      </section>
      <section className={styles.section}>
        <h2>Challenges in Accessing Information</h2>
        <p>There is a lot of evidence about claims that are documented in published academic research papers but these are unavailable to many commercial software engineers because: (a) they are behind a paywall, (b) they are written in unfamiliar academic language, and (c) it is difficult to find the trends in evidence to make a decision without a lot of searching, filtering, and reading.</p>
      </section>
      <section className={styles.section}>
        <h2>Our Solution</h2>
        <p>I want to make this easier for practitioners by doing most of this work and storing the results in a searchable database.</p>
      </section>
    </div>
  );
};

export default Home;
