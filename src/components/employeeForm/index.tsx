import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { EmployeeType } from "../../pages/funcionarios";
import styles from "./styles.module.scss";

interface EmployeeFormProps {
  onSubmit: (employee: EmployeeType) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit }) => {
  const [demitido, setDemitido] = useState<boolean>(false);
  const [employee, setEmployee] = useState<EmployeeType>({
    _id: "",
    address: "",
    createdAt: "",
    email: "",
    fullName: "",
    phone: "",
    updatedAt: "",
    dateOfAdmission: "",
    dateOfBirth: "",
    performanceEvaluations: 0,
    salary: 0,
    photo: "",
    position: "",
    reasonForTheDismissal: "",
    dateOfDismissal: "",
  });

  const handleDemitido = () => {
    setDemitido(!demitido);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit(employee);
  };

  const handleChangeFile = (event: any): void => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEmployee({ ...employee, photo: reader.result });
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form_group}>
        <label htmlFor="fullName">Nome Completo:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={employee.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="phone">Telefone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={employee.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="address">Endereço:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={employee.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="dateOfBirth">Data de nascimento:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={employee.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="dateOfAdmission">Data de admissão:</label>
        <input
          type="date"
          id="dateOfAdmission"
          name="dateOfAdmission"
          value={employee.dateOfAdmission}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="position">Posição:</label>
        <input
          type="text"
          id="position"
          name="position"
          value={employee.position}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="salary">Salário:</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="performanceEvaluations">Avaliação:</label>
        <input
          type="number"
          id="performanceEvaluations"
          name="performanceEvaluations"
          value={employee.performanceEvaluations}
          onChange={handleChange}
          min="0"
          max="10"
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="photo">Foto:</label>
        <input type="file" onChange={handleChangeFile} accept="image/*" />
      </div>
      {/* <div className={styles.form_group}>
        <label htmlFor="photo">Foto:</label>
        <input
          type="text"
          id="photo"
          name="photo"
          value={employee.photo}
          onChange={handleChange}
        />
      </div> */}
      <div className={styles.form_group}>
        <div>
          <label htmlFor="demitido">Demitido:</label>
          <Checkbox onClick={handleDemitido} />
        </div>
      </div>
      {demitido && (
        <>
          <div className={styles.form_group}>
            <label htmlFor="dateOfDismissal">Data de dismissão:</label>
            <input
              type="date"
              id="dateOfDismissal"
              name="dateOfDismissal"
              value={employee.dateOfDismissal}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="reasonForTheDismissal">Motivo de dismissão:</label>
            <input
              type="text"
              id="reasonForTheDismissal"
              name="reasonForTheDismissal"
              value={employee.reasonForTheDismissal}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <div className={styles.containerButtons}>
        <button className={styles.SubmitButton} type="submit">
          Salvar
        </button>
        <button className={styles.CancelButton} type="button">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
