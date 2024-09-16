import { sleep } from "../libs/utils";
import { IUser } from "../types/IUser";

type ICreateUserDTO = Omit<IUser, 'id'>;

export async function createUser({ name, email, blocked }: ICreateUserDTO) {
  await sleep(1500);
  const res = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name, email, blocked
    })
  });
  const body = await res.json();
  return body as IUser;
}
