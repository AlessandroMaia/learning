import { CounterSlice } from "./slices/counterSlice";
import { UserSlice } from "./slices/userSlice";
import { StateCreator } from "zustand";

export type Store = {
  user: UserSlice;
  counter: CounterSlice;
};

export type StoreSlice<T> = StateCreator<
  Store,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  T
>;
