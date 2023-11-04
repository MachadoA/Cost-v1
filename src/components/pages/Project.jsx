import React, { useEffect, useState } from 'react';
import styles from './project.module.css'
import { useParams } from 'react-router-dom';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';

import { v4 as uuidv4 } from 'uuid';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';


export default function Project() {

    const {id} = useParams();
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [services, setServices] = useState([])
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        //para ver o loading
        setTimeout(() => {
            fetch(`http://localhost:5000/project/${id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',},
        }).then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch(err => console.log(err));
        }, 300)
    }, [id])

    function editPost(project){
        // console.log(project)
        setMessage('')
        //budget validation
        if(project.budget < project.cost){
            //mensagem
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/project/${project.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
            })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(!showProjectForm)
                setMessage('Projeto atualizado')
                setType('sucess')
            }
            ) 
            .catch(err => console.error('erro no patch', err))
    }

    function createService(project) {
        //pegar o project o ultimo por props 
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        
        if (newCost > parseFloat(project.budget)) {
          setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
          setType('error')
          project.services.pop()
          return false
        }
      
        project.cost = newCost
        fetch(`http://localhost:5000/project/${project.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setServices(data.services)
            //exibir os serviços
            // setShowServiceForm(!showServiceForm)
            setShowServiceForm(false)
            setMessage('Serviço adicionado!')
            setType('success')
          })
      }


      function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
          (service) => service.id !== id,
        )
        const projectUpdated = project
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
        fetch(`http://localhost:5000/project/${projectUpdated.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectUpdated),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
          })
      }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
      }

  return (
    <>
        {project.name ? (
            <div className={styles.projectDetails}>
                <Container customClass='column'>
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.detailsContainer}>
                        <h1>Projecto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                           {!showProjectForm ? ' Editar projecto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.form}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total do Orçamento:</span> R$ {project.budget}
                                </p>
                                <p>
                                    <span>Total utilizado:</span> R$ {project.cost}
                                </p>
                            </div>
                        ): (
                            <div className={styles.form}>
                                <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                            </div>
                        )}
                    </div>


            <div className={styles.serviceFormContainer}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
              </button>
              <div className={styles.form}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>

            <h2>Serviços:</h2>
                <Container customClass="start">
                {services.length > 0 &&
                    services.map((service) => (
                    <ServiceCard
                        id={service.id}
                        name={service.name}
                        cost={service.cost}
                        description={service.description}
                        key={service.id}
                        handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>} 
              </Container>
            </Container>
            </div>
        ): (
            <Loading />
        )}
    
    </>
  )
}
