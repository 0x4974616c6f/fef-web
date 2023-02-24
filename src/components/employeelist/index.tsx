import { EmployeeType } from "../../pages/funcionarios";
import Employee from "../employee";
import styles from "./styles.module.scss";

type EmployeeListProps = {
  employees: Array<EmployeeType>;
  onFetchData: () => void;
};

const EmployeeList = ({ employees, onFetchData }: EmployeeListProps) => {
  return (
    <div className={styles.employeeList}>
      {employees.map((employee, index) => (
        <Employee
          key={employee._id}
          employee={employee}
          onFetchRemove={onFetchData}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
