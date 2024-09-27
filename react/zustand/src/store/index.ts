import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Store } from "./Store";
import { createCounterSlice } from "./slices/counterSlice";
import { createUserSlice } from "./slices/userSlice";

export const useStore = create<Store>()(
  devtools(
    immer((set, get, api) => ({
      counter: createCounterSlice(set, get, api),
      user: createUserSlice(set, get, api),
    })),
    {
      enabled: import.meta.env.DEV,
    }
  )
);
