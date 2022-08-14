import { CheckCircle, Trash } from 'phosphor-react';
import { ITask } from '../App';
import styles from './NewTask.module.css';

interface Props{
    task: ITask;
    onDelete: (taskId: string) => void;
    onComplete: (taskId: string) => void;
}

export function NewTask({task, onDelete, onComplete}: Props) {

    return(
        <div className={styles.task}>
            <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
                {task.isCompleted ? <CheckCircle size={20} /> : <div />}
            </button>
            <p className={task.isCompleted ? styles.textCompleted : ""}>
                {task.title}
            </p>

            <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
                <Trash size={20} />
            </button>
        </div>
    )
}