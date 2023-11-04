import React, { useState } from 'react';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import styles from '../project/projectForm.module.css'

export default function ServiceForm({handleSubmit, btnText, projectData}) {
    const [service, setService] = useState({});

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

  return (
    <form onSubmit={submit} className={styles.form}>
        <Input type="text" text="nome do serviço" name='name' placeholder='Insira o nome do serviço' handleOnChange={handleChange} />
        <Input type="number" text="custo do serviço" name='cost' placeholder='Insira o valor' handleOnChange={handleChange} />
        <Input type="text" text="descrição do serviço" name='description' placeholder='Descreva o serviço' handleOnChange={handleChange} />
        <SubmitButton text={btnText} />
    </form>
  )
}
