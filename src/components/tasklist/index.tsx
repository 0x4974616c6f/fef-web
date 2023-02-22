import { TaskProps } from '../../pages/dashboard'
import Task from '../task'
import styles from './styles.module.scss'


type TaskListProps = {
    tasks: TaskProps[]
    onFetchData: () => void
}

const TaskList = ({ tasks, onFetchData }: TaskListProps) => {
    return (
        <div className={styles.taskList}>
            {tasks.map((task, index) => (
                <Task onFetchRemove={onFetchData} key={task._id}  task={task} />
            ))}
        </div>
    );
}

export default TaskList;