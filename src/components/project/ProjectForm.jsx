import React, { useEffect, useState } from 'react';
import styles from './projectForm.module.css'
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

export default function ProjectForm({btnText, handleSubmit, projectData}) {

  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {}); ///projectData ou objeto vazio {}

  useEffect(() => {
     fetch("http://localhost:5000/categories", {
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      },
    })
    .then((resp) => resp.json()) ///peguei os dados e transformei em json
    .then((data) =>{
      setCategories(data) //peguei os dados convertidos e joguei para setCategories
    })
    .catch((err) => console.log(err))
  }, [])

  const submit = (e) =>{
    e.preventDefault()
   // console.log(project)
    handleSubmit(project) //executo o metodo passado pela props em argumento
  }

  function handleChange(e){
    setProject({ ...project, [e.target.name]: e.target.value})
  }

  function handleCategory(e){
    setProject({ ...project, category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    },
  }) ///pegar o projeto e alterar o category db.json

  }
  
  return (
    <form onSubmit={submit} className={styles.form}>
        <Input type='text' text='Nome do projeto' name='name' placeholder='Insira o nome do Projeto' handleOnChange={handleChange} value={project.name ? project.name : ''} />
        <Input type='number' text='Orçamento do Projeto' name='budget' placeholder='Insira o orçamento total' handleOnChange={handleChange} value={project.budget ? project.budget : ''}/>
        <Select name='category_id' text='Selecione a categoria' options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ''}/>
        <SubmitButton text={btnText}/>
    </form>
  )
}
