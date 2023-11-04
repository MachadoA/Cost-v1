import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';

import styles from './navBar.module.css';
import logo from '../../img/costs_logo.png';



export default function NavBar() {
  return (
    <nav className={styles.navbar}>
        <Container>
            <Link to="/"> <img src={logo} alt='logo Costs' /></Link>
            <ul className={styles.list}>
                <li className={styles.item}><Link to="/">Home</Link></li>
                <li className={styles.item}><Link to="/Projects">Project</Link></li>
                <li className={styles.item}><Link to="/Company">Empresa</Link></li>
                <li className={styles.item}><Link to="/Contact">Contato</Link></li>
            </ul>
        </Container>
    </nav>
  )
}
