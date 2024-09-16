import { sleep } from "../libs/utils";
import { IUser } from "../types/IUser";

export async function getUsers() {
  await sleep();
  const res = await fetch('http://localhost:3000/users');
  const body = await res.json();
  return body as IUser[];
}
