import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { TaskProps } from "../../pages/dashboard";
import { api } from "../../services/apiClient";
import { formatDate } from "../../utils/formatDate";
import styles from "./styles.module.scss";

interface TaskPropsComponent {
  task: TaskProps;
  onFetchRemove: () => void;
  handleModal: (id: string) => void;
}

const Task = ({ task, onFetchRemove, handleModal }: TaskPropsComponent) => {
  const [user, setUser] = useState<string>("");
  const getUserName = async (id: string) => {
    const user = await api.get(`/users/${id}`);
    setUser(user.data.name);
  };

  useEffect(() => {
    getUserName(String(task.userId));
  });

  const editTask = () => {
    handleModal(String(task.id));
  };
  const changeDone = async () => {
    await api.put(`/tasks/done/${task.id}`, {
      done: !task.done,
    });
    onFetchRemove();
  };
  const removeTask = async () => {
    if (window.confirm("Deseja realmente excluir esta tarefa?")) {
      await api.delete(`/tasks/${task.id}`);
      onFetchRemove();
    }
  };
  return (
    <div className={`${styles.task} ${task.done ? styles.done : ""}`}>
      <h3>{task.title}</h3>
      <h5>{task.description}</h5>
      <IoCheckmarkDoneCircleSharp
        onClick={changeDone}
        className={styles.ChangeDone}
        size={20}
        color={task.done ? "#2ECC40" : "#FF4136"}
      />
      <MdDelete onClick={removeTask} className={styles.delete} size={20} />
      <AiFillEdit onClick={editTask} className={styles.edit} size={20} />
      <div className={styles.metadata}>
        <span>Criado em: {formatDate(String(task.createdAt))}</span>
        <span>Atualizado em: {formatDate(String(task.updatedAt))}</span>
        <span>Criado por: {user}</span>
      </div>
    </div>
  );
};

export default Task;
