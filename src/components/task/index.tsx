import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { TaskProps } from '../../pages/dashboard';
import { formatDate } from '../../utils/formatDate';
import { setupAPIClient } from '../../services/api';

const Task = ({ id, title, description, done, created_at, updated_at, user_id }: TaskProps) => {
    const [nameUser, setNameUser] = useState('');

    return (
        <div className={`${styles.task} ${done ? styles.done : ''}`}>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className={styles.metadata}>
                <span>Criado em: {formatDate(created_at)}</span>
                <span>Atualizado em: {formatDate(updated_at)}</span>
                <span>ID do usuário: {user_id}</span>
            </div>
        </div>
    );
}

export default Task