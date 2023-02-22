import { Checkbox, FormControlLabel } from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { FiPlus, FiRefreshCcw } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { Header } from '../../components/Header'
import Modal from '../../components/modalAdd'
import TaskList from '../../components/tasklist'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'

export type TaskProps = {
    _id: string
    title: string
    description: string
    done: boolean
    created_at: string
    updated_at: string
    user_id: string
    user_name: string
}

interface HomeProps {
    tasks: TaskProps[]
}



export default function Dashboard({ tasks }: HomeProps) {
    const [titleTaskAdd, setTitleTaskAdd] = useState<string>('')
    const [descriptionTaskAdd, setDescriptionTaskAdd] = useState<string>('')
    const [doneTaskAdd, setDoneTaskAdd] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [taskList, setTaskList] = useState<TaskProps[]>(tasks || [])
    const [showModalAdd, setShowModalAdd] = useState<boolean>(false)
    const [hydrated, setHydrated] = useState<boolean>(false)

    useEffect(() => {
        setHydrated(true)
    }, [])
    if (!hydrated) {
        return null
    }

    async function handleAddTask() {
        // e.preventDefault()

        try {
            setLoading(true)
            const data = new FormData()

            if (titleTaskAdd === '' || descriptionTaskAdd === '') {
                toast.error('Preencha todos os campos')
                return
            }

            data.append('title', titleTaskAdd)
            data.append('description', descriptionTaskAdd)
            data.append('done', String(doneTaskAdd))
            const apiClient = setupAPIClient()
            await apiClient.post('/tasks', data)
            toast.success('Tarefa adicionada com sucesso.')

            setTitleTaskAdd('')
            setDescriptionTaskAdd('')
            setDoneTaskAdd(false)
            setLoading(false)
            handleCloseModalAdd()
            handleRefreshTasks()
        } catch (err) {
            toast.error('Ops erro ao cadastrar tarefa.')
            setLoading(false)
        }
    }

    function handleTitleTaskAdd(event: React.ChangeEvent<HTMLInputElement>) {
        setTitleTaskAdd(event.target.value)
    }

    function handleDescriptionTaskAdd(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescriptionTaskAdd(event.target.value)
    }

    function handleDoneTaskAdd(event: React.ChangeEvent<HTMLInputElement>) {
        setDoneTaskAdd(event.target.checked)
    }

    function handleOpenModalAdd() {
        setShowModalAdd(true)
    }

    function handleCloseModalAdd() {
        setShowModalAdd(false)
    }


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
                        <button onClick={handleOpenModalAdd}>
                            <FiPlus size={25} color='#3fffa3' />
                        </button>
                        <Modal isOpen={showModalAdd} handleCloseModal={handleCloseModalAdd} >
                            <div className={styles.modal_adicionar}>
                                <h3>Adicionar Tarefa</h3>
                                <form>
                                    <label htmlFor="title">Título</label>
                                    <input type="text" value={titleTaskAdd} onChange={handleTitleTaskAdd} placeholder="Digite o título da tarefa" />
                                    <label htmlFor="Description">Descrição</label>
                                    <textarea value={descriptionTaskAdd} onChange={handleDescriptionTaskAdd} placeholder="Digite a descrição da tarefa" />
                                    <FormControlLabel control={<Checkbox onChange={handleDoneTaskAdd} value={doneTaskAdd} />} label="Feito" />
                                </form>
                                <div className={styles.containerButtons}>
                                    <button type='submit' onClick={handleAddTask}>
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    <article className={styles.listOrders}>
                        {taskList.length === 0 ? (
                            <span className={styles.emptyList}>
                                Nenhuma tarefa aberto foi encontrado...
                            </span>
                        ) : (
                            <TaskList onFetchData={handleRefreshTasks} tasks={taskList} />
                        )}
                    </article>
                </main>
            </div >
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
