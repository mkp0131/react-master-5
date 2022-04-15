import { atom } from 'recoil';

export interface IToDo {
  id: number;
  toDo: string;
}

export enum ToDoCategory {
  'TO_DO' = 'to do',
  'DOING' = 'doing',
  'DONE' = 'done',
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'to do': [],
    doing: [],
    done: [],
  },
});

export const todoCategoryState = atom<ToDoCategory>({
  key: 'toDoCategory',
  default: ToDoCategory.TO_DO,
});
