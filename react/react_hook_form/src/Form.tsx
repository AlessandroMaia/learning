import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { IUser } from "./IUser";

interface IFormProps {
  user: IUser
}

export function Form({ user }: IFormProps){
  const { handleSubmit: submit, register, formState, clearErrors, setFocus, setValue, watch, trigger } = useForm<IUser>({
    values: user,
    resetOptions: {
      keepDirtyValues: true
    },
    mode: "onSubmit",
    reValidateMode: "onBlur"
  });

  const handleSubmit = submit((data) => {
    console.log("🚀 ~ handleSubmit ~ data:", data);
  }, (error) => {
    console.log("🚀 ~ App ~ error:", error);
  });

  useEffect(() => {
    const { unsubscribe } = watch(async (data, { name }) => {
      const zipcode = data.zipcode ?? '';

      if (name === 'zipcode' && zipcode.length >= 8) {
        const res = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`);
        const body = await res.json();

        setValue("city", body.localidade);
        setValue("street", body.logradouro);
      }
    });

    return () => unsubscribe();
  }, [watch, setValue]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="flex flex-col gap-2 w-96"
        onSubmit={handleSubmit}
      >
        <div>
          <Input
            placeholder="Nome"
            {...register('name', {
              required: 'Preencha o nome'
            })}
          />

          <ErrorMessage
            errors={formState.errors}
            name="name"
            render={({ message }) => (
              <small className="text-red-400 block">
                {message}
              </small>
            )}
          />
        </div>

        <div>
          <Input
            type="number"
            placeholder="Idade"
            {...register('age', {
              min: {
                value: 18,
                message: "Idade minima de 18 anos"
              }
            })}
          />

          <ErrorMessage
            errors={formState.errors}
            name="age"
            render={({ message }) => (
              <small className="text-red-400 block">
                {message}
              </small>
            )}
          />
        </div>

        <Input
          type="number"
          placeholder="CEP"
          {...register('zipcode')}
        />

        <Input
          type="text"
          placeholder="Cidade"
          {...register('city')}
        />

        <Input
          type="text"
          placeholder="Rua"
          {...register('street')}
        />

        <Button className="mt-4">
          Enviar
        </Button>

        <div className="flex gap-2">
          <Button
            className="flex-auto"
            variant="outline"
            type="button"
            onClick={() => clearErrors()}
          >
            Limpar erros
          </Button>
          <Button
            className="flex-auto"
            variant="outline"
            type="button"
            onClick={() => setFocus("name")}
          >
            Focar no nome
          </Button>
          <Button
            className="flex-auto"
            variant="outline"
            type="button"
            onClick={() => trigger()}
          >
            Foçar validação
          </Button>
        </div>
      </form>
    </div>
  );
}