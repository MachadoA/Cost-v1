import React from 'react';

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import styles from './projectCard.module.css'
import { Link } from 'react-router-dom';

export default function ProjectCard({id, name, budget, category, handleRemove}) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

  return (
    <div className={styles.projectCard}>
        <h4>{name}</h4>
        <p> <span>Orçamento:</span> R${budget}</p>
        <p className={styles.categoryText}>
            <span className={`${styles[category.toLowerCase()]}`}></span>{category}
        </p>
        <div className={styles.projectCardActions}>
            <Link to={`/project/${id}`}>
                <BsPencil /> Editar
            </Link>
            <button onClick={remove}>
                <BsFillTrashFill /> Excluir
            </button>
        </div>

    </div>
  )
}
