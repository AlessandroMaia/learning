import { ITodo } from '../entities/ITodo';
import { IUser } from '../entities/IUser';

import { createStore } from './createStore';

interface IGlobalStore {
  user: IUser | null;
  todos: ITodo[];
  login(): void;
  logout(): void;
  addTodo(title: string, author?: string): void;
  toggleTodoDone(todoId: number): void;
  removeTodo(todoId: number): void;
}

export const useGlobalStore = createStore<IGlobalStore>((set, get) => ({
  user: null,
  todos: [],
  login: () =>
    set({
      user: {
        name: 'Alessandro',
        email: 'Alessandro@gmail.com',
      },
    }),
  logout: () => set({ user: null }),
  addTodo: (title: string) => {
    set((prevState) => ({
      todos: prevState.todos.concat({
        id: Date.now(),
        title,
        author: get().user?.name ?? 'Convidado',
        done: false,
      }),
    }));
  },
  toggleTodoDone: (todoId: number) => {
    set((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo,
      ),
    }));
  },
  removeTodo: (todoId: number) => {
    set((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== todoId),
    }));
  },
}));
