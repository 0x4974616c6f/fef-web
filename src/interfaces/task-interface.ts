export interface ITask {
  _id: string;
  title: string;
  description: string;
  done: boolean;
  user_id: string;
  user_name: string;
  created_at: Date;
  updated_at: Date;
}