import { TaskProps } from "../../pages/dashboard";
import Task from "../task";
import styles from "./styles.module.scss";

type TaskListProps = {
  tasks: TaskProps[];
  onFetchData: () => void;
  handleModal: (id: string) => void;
};

const TaskList = ({ tasks, onFetchData, handleModal }: TaskListProps) => {
  const handleModalTaskList = (id: string) => {
    handleModal(id);
  };
  return (
    <div className={styles.taskList}>
      {tasks.map((task, index) => (
        <Task
          handleModal={handleModalTaskList}
          onFetchRemove={onFetchData}
          key={task._id}
          task={task}
        />
      ))}
    </div>
  );
};

export default TaskList;
