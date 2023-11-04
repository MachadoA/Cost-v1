import styles from './select.module.css';

export default function Select({ text, name, options, handleOnChange, value}){

    return(
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma opção</option>
                {options && options.length > 0 && options.map((option) => (
                <option value={option.id} key={option.id}>
                    {option.name}
                </option>
                ))}
            </select>
        </div>
    )
}

