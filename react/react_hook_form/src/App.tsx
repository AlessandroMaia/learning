import { useEffect, useState } from "react";
import { Form } from "./Form";
import { sleep } from "./lib/utils";
import { IUser } from "./IUser";

async function getUser() {
  await sleep(2000);

  return {
    age: 28,
    city: 'Brasília',
    name: 'Alessandro',
    street: 'Não interessa',
    zipcode: '0000000'
  };
}

function App() {
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
     getUser()
      .then(data => {
        setUser(data);
      });
  }, []);

  return <Form user={user}/>;
}

export default App;
