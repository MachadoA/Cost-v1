import React, { useEffect, useState } from 'react';
import Message from '../layout/Message';
import { useLocation } from 'react-router-dom';
import Container from '../layout/Container';

import styles from './projects.module.css'
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';
import Loading from '../layout/Loading';

export default function Projects() {

  const [projects, setProjects] = useState([])
  const [removeLoanding, setRemoveLoanding] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  
  const location = useLocation()
  let message = ''
  if(location.state){
    message = location.state.message
  }
  // console.log('messagem:', message)
  
  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/project', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) =>{
        // console.log(data)
        setProjects(data)
        setRemoveLoanding(true)
      })
      .catch((err) => console.log(err))
    }, 300)
  }, [])

  function removeProject(id){
    fetch(`http://localhost:5000/project/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    }).then(resp => resp.json())
    .then(data => {
      setProjects(projects.filter((project) => project.id !== id))
      ///mostrar mensagem de remoção
      setProjectMessage('Projeto removido com sucesso!')
    })
  }

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/NewProject" text="Criar Projeto" />
      </div>
      <div>
        {message && <Message type='success' msg={message} />}
        {projectMessage && <Message type='success' msg={projectMessage} />}
        <Container customClass='starts'>
          {projects.length > 0 && 
            projects.map((project) => 
            <ProjectCard name={project.name}  id={project.id} budget={project.budget} category={project.category.name} key={project.id} handleRemove={removeProject} /> )
          }
          {!removeLoanding && <Loading />}
          {removeLoanding && projects.length === 0 && (
            <p>Não há projectos cadastrados!</p>
          )}
        </Container>
      </div>
    </div>
  )
}
