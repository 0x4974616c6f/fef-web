import { Avatar } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { EmployeeType } from "../../pages/funcionarios";
import { api } from "../../services/apiClient";
import { formatDate } from "../../utils/formatDate";
import formatSalario from "../../utils/formatSalary";
import styles from "./styles.module.scss";

interface EmployeePropsComponent {
  employee: EmployeeType;
  onFetchRemove: () => void;
}

const Employee = ({ employee, onFetchRemove }: EmployeePropsComponent) => {
  const removeEmployee = async () => {
    if (window.confirm("Deseja realmente excluir esse funcionário ?")) {
      await api.delete(`/employees/${employee._id}`);
      onFetchRemove();
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.photo_and_fullName}>
        <Avatar
          alt={employee.fullName}
          src={`http://localhost:5050/${employee.photo}`}
          sx={{ width: 34, height: 34 }}
        />
        <h3>{employee.fullName}</h3>
      </div>
      <h4>{employee.position}</h4>
      <h4>Salário: {formatSalario(employee.salary)}</h4>
      <h4>Endereço: {employee.address}</h4>
      <h4>Email: {employee.email}</h4>
      <h4>Telefone: {employee.phone}</h4>
      <h4>Avaliação: {employee.performanceEvaluations}</h4>
      {employee.reasonForTheDismissal && (
        <h4>Motivo da demissão: {employee.reasonForTheDismissal}</h4>
      )}
      <MdDelete onClick={removeEmployee} className={styles.delete} size={20} />
      <div className={styles.metadata}>
        <span>
          Data de nascimento: {formatDate(String(employee.dateOfBirth))}
        </span>
        <span>
          Data de admissão: {formatDate(String(employee.dateOfAdmission))}
        </span>
        {employee.dateOfDismissal && (
          <span>
            Data de demissão: {formatDate(String(employee.dateOfDismissal))}
          </span>
        )}
      </div>
      <div className={styles.metadata}>
        <span>Criado em: {formatDate(String(employee.createdAt))}</span>
        <span>Atualizado em: {formatDate(String(employee.updatedAt))}</span>
      </div>
    </div>
  );
};

export default Employee;
