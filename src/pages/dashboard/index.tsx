import { useState } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head'
import styles from './styles.module.scss'

import { Header } from '../../components/Header'

import { FiRefreshCcw } from 'react-icons/fi'

import { setupAPIClient } from '../../services/api'

import Modal from 'react-modal'

export type TaskProps = {
    id: string
    title: string
    description: string
    done: boolean
    creted_at: Date
    updated_at: Date
    user_id: string
}

interface HomeProps {
    tasks: TaskProps[]
}

export default function Dashboard({ tasks }: HomeProps) {
    const [taskList, setTaskList] = useState<TaskProps[]>(tasks || [])


    async function handleRefreshTasks() {
        const apiClient = setupAPIClient()

        const response = await apiClient.get('/tasks/all')

        setTaskList(response.data)
    }

    return (
        <>
            <Head>
                <title>Ferrinox - Lista De Tarefas</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Últimas Tarefas</h1>
                        <button onClick={handleRefreshTasks}>
                            <FiRefreshCcw size={25} color='#3fffa3' />
                        </button>
                    </div>
                    <article className={styles.listOrders}>
                        {taskList.length === 0 && (
                            <span className={styles.emptyList}>
                                Nenhuma tarefa aberto foi encontrado...
                            </span>
                        )}
                    </article>
                </main>
            </div>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/tasks/all')
    return {
        props: {
            tasks: response.data
        }
    }
})
