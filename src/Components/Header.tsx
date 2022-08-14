import Logo from '../assets/Logo.svg';
import styles from './Header.module.css';
import plus from '../assets/plus.svg';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props{
    onAddTask: (taskTitle: string) => void;
}

export function Header({onAddTask}: Props){
    const [title, setTitle] = useState("");

    function handleSubmit(event: FormEvent){
        event.preventDefault();

        onAddTask(title);
        setTitle("");
    }

    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    return(
        <header className={styles.header}>
            <img src={Logo} alt="Logo rocket" />
           

           <form className={styles.newTaskForm} onSubmit={handleSubmit}>
                <input type="text" placeholder="Adicione uma nova tarefa" onChange={onChangeTitle} value={title} required/>
                <button type="submit">Criar <img src={plus}/></button>                    
            </form>
        </header>
    )
}