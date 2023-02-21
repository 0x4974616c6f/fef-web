import React from 'react'
import styles from './styles.module.scss'
import Task from '../task'
import { TaskProps } from '../../pages/dashboard'


type TaskListProps = {
    tasks: TaskProps[]
}

const TaskList = ({ tasks }: TaskListProps) => {
    return (
        <div className={styles.taskList}>
            {tasks.map((task, index) => (
                <Task key={index} {...task} />
            ))}
        </div>
    );
}

export default TaskList;