import { sleep } from "../libs/utils";
import { IUser } from "../types/IUser";

type IUpdateUserDTO = Partial<Omit<IUser, 'id'>> & { id: string };

export async function updateUser({ id, name, email, blocked }: IUpdateUserDTO) {
  await sleep(2000);
  const res = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'PATCH',
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
