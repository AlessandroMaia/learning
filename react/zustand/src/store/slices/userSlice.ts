import { StoreSlice } from "../Store";

type UserStore = {
  data: {
    name: string;
    email: string;
    username: string;
  };
};

type UserActions = {
  setUsername: (username: string) => void;
};

export type UserSlice = UserStore & UserActions;

export const createUserSlice: StoreSlice<UserSlice> = (set) => ({
  data: {
    name: "alessandro",
    email: "alessandro@gmail.com",
    username: "alessandromaia",
  },
  setUsername: (username: string) =>
    set((prev) => {
      prev.user.data.username = username;
    }),
});
