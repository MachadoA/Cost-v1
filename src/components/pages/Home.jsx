import React from 'react';

import savings from '../../img/savings.svg'
import styles from './home.module.css';
import LinkButton from '../layout/LinkButton';

export default function Home() {
  return (
    <section className={styles.homeContainer}>
        <h1>Bem-vindo ao <span>Costs</span>!</h1>
        <p>Comece a gerenciar seus projetos agora mesmo!</p>
        <LinkButton to="/NewProject" text="Criar Projeto" />
        <img src={savings} alt='Costs'/>
    </section>
  )
}
