import React from 'react';
import styles from '../styles/Loading.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;