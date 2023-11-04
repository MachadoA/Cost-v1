import React from 'react';
import styles from './newProject.module.css'
import ProjectForm from '../project/ProjectForm';
import { useNavigate } from 'react-router-dom';

export default function NewProject() {

  const navigate = useNavigate()

  function createPost(project){
    ///initialize cost and services
    project.cost = 0
    project.services = []

    fetch("http://localhost:5000/project", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    }).then((resp) => resp.json())
      .then((data) => {
        // console.log(data)
        //redirect
        navigate('/projects',{state: {message: 'Projeto criado com sucesso'}})
      })
      .catch((err) => console.log(err))

  }

  return (
    <div className={styles.newProjectContainer}>
        <h1>Criar Projeto</h1>
        <p>Crie seu projeto para depois adicionar os serviços</p>
        <ProjectForm handleSubmit={createPost} btnText='Criar Projecto' />
    </div>
  )
}
