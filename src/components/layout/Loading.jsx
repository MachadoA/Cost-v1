import React from 'react';
import styles from './loading.module.css';
import loading from '../../img/loading.svg'

export default function Loading() {
  return (
    <div className={styles.loaderContainer}>
        <img className={styles.loading} src={loading} alt="loading" />
    </div>
  )
}
