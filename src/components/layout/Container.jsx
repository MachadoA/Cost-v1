import React from 'react';
import styles from './container.module.css'

export default function Container(props) {
  //alterar as classes para que eu possa mudar o q sera visto
  return (
    <div className={`${styles.container} ${styles[props.customClass]}`}>{props.children}</div>
  )
}
