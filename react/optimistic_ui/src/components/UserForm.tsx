import { useCreateUser } from "@/app/hooks/useCreateUser";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useState } from "react";
import { toast } from "sonner";

export function UserForm() {
  const { createAsync } = useCreateUser();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setName('');
      setEmail('');

      await createAsync({
        name,
        email,
        blocked: false
      });

      toast.success('Usuário cadastrado com sucesso!');
    } catch (error) {
      toast.error(`Error:  ${error}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-muted/50 p-4 rounded-md">
      <div className="flex gap-3">
        <Input
          placeholder="Nome"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <Button className="mt-3 w-full" >Cadastrar</Button>
    </form>
  );
}
