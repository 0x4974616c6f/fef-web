import { Checkbox } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { mongoDateToBrowserDate } from "../../utils/formatDate";
import styles from "./styles.module.scss";

interface EmployeeFormProps {
  onSubmit: (employee: EmployeeFormInputs) => void;
  data?: [EmployeeFormInputs];
}

export interface EmployeeFormInputs {
  fullName: string;
  dateOfBirth: Date;
  address: string;
  phone: string;
  email: string;
  position: string;
  salary: number;
  performanceEvaluations: number;
  dateOfAdmission: Date;
  photo: string | ArrayBuffer;
  dateOfDismissal?: Date;
  reasonForTheDismissal?: string;
}

const EmployeeFormEdit: React.FC<EmployeeFormProps> = ({ onSubmit, data }) => {
  const [demitido, setDemitido] = useState<boolean>(false);
  const [employee, setEmployee] = useState<EmployeeFormInputs>({
    fullName: data[0]?.fullName || "",
    dateOfBirth: data[0]?.dateOfBirth || new Date(),
    address: data[0]?.address || "",
    phone: data[0]?.phone || "",
    email: data[0]?.email || "",
    position: data[0]?.position || "",
    salary: data[0]?.salary || 0,
    performanceEvaluations: data[0]?.performanceEvaluations || 0,
    dateOfAdmission: data[0]?.dateOfAdmission || new Date(),
    photo: data[0]?.photo || "",
    reasonForTheDismissal: data[0]?.reasonForTheDismissal || "",
  });

  const router = useRouter();

  const handleCancelar = () => {
    router.back();
  };

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
          value={mongoDateToBrowserDate(String(employee.dateOfBirth))}
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
          value={mongoDateToBrowserDate(String(employee.dateOfAdmission))}
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
              value={mongoDateToBrowserDate(String(employee.dateOfDismissal))}
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
        <button
          onClick={handleCancelar}
          className={styles.CancelButton}
          type="button"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EmployeeFormEdit;
