export interface Task {
  id: number
  title: string;
  time: number | string;
  status: string;
  date: string | Date;
  category: string
}
