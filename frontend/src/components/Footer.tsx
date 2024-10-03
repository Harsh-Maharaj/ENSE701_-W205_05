import React from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Title and Full Name */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>SPEED</h1>
          <p className={styles.subtitle}>
            Software Practice Empirical Evidence Database
          </p>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/articles/all-articles">View all Articles</Link></li>
            <li><Link href="/articles/create-article">Submit a New Article</Link></li>
            <li><Link href="/articles/lookup-submission">Lookup a Submission</Link></li>
            <li><Link href="/admin/dashboard">Admin Dashboard</Link></li>
            <li><Link href="/admin/rejected-articles">Rejected Articles</Link></li>
            <li><Link href="/moderator/ModeratorQueue">Moderator Queue</Link></li>
            <li><Link href="/analyst/analyst-dashboard">Analyst Queue</Link></li>
            <li><Link href="/articles/all-articles">Our Terms of Use</Link></li>
            <li><Link href="/articles/all-articles">Our Privacy Policy</Link></li>
          </ul>
        </div>

        {/* About Section */}
        <div className={styles.about}>
          <h3>About Us</h3>
          <p>
            SPEED is a peer-reviewed database of software engineering related articles. We rely on the community to submit articles and our team of moderators and analysts to review them for publication and provide evidence if the claims can be accademicly backed or not.
          </p>
        </div>
      </div>

      {/* Copyright and GitHub Link */}
      <div className={styles.footerBottom}>
        <p>&copy; 2024 SPEED. All rights reserved.</p>
        <p> <a href="https://github.com/thomasbrears/ENSE701" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.githubLink} > <FaGithub size={24} /> {/* GitHub logo */} </a> </p>
      </div>
    </footer>
  );
};

export default Footer;
