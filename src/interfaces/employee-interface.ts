export interface IEmployee {
  _id: string;
  fullname: string;
  dateOfBirth: Date;
  address: string;
  phone: string;
  email: string;
  position: string;
  salary: number;
  performanceEvaluations: number;
  dateOfAdmission: Date;
  dateOfDismissal: Date;
  reasonForTheDismissal: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}