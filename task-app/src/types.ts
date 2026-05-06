export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};

export type ColumnData = {
  id: TaskStatus;
  title: string;
};
