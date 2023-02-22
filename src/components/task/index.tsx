import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { TaskProps } from '../../pages/dashboard';
import { api } from '../../services/apiClient';
import { formatDate } from '../../utils/formatDate';
import styles from './styles.module.scss';

interface TaskPropsComponent {
    task: TaskProps
    onFetchRemove: () => void
}

const Task = ({ task ,onFetchRemove }: TaskPropsComponent) => {
    const removeTask = async () => {
        if (window.confirm('Deseja realmente excluir esta tarefa?')) {
            await api.delete(`/tasks/${task._id}`)
            onFetchRemove()
        }
    }
    return (
        <div className={`${styles.task} ${task.done ? styles.done : ''}`}>
            <h3>{task.title}</h3>
            <h5>{task.description}</h5>
            <MdDelete onClick={removeTask}  className={styles.delete} size={20}  />
            <AiFillEdit className={styles.edit} size={20}  />
            <div className={styles.metadata}>
                <span>Criado em: {formatDate(task.created_at)}</span>
                <span>Atualizado em: {formatDate(task.updated_at)}</span>
                <span>Criado por: {task.user_name}</span>
            </div>
        </div>
    );
}

export default Task