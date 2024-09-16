import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { useMutation } from "@tanstack/react-query";
import { sleep } from "./sleep";
import { IUser } from "./types";

export function Users() {
    const {
        data,
        refetch,
        isLoading,
        isPending,
        isFetching,
        error: usersError,
    } = useUsers();

    const { mutate, isPending: isLoadingPost } = useMutation({
        mutationFn: async (variables: {
            name: string;
            email: string;
        }): Promise<IUser> => {
            await sleep(1500);
            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(variables),
            });

            return res.json();
        },
        onError: (error, variables) => {
            console.log(error.toString(), variables);
        },
        onSuccess: (data, variables) => {
            console.log(data, variables);
        },
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const elements = event.currentTarget
            .elements as typeof event.currentTarget.elements & {
            name: HTMLInputElement;
            email: HTMLInputElement;
        };

        mutate({
            name: elements.name.value,
            email: elements.email.value,
        });
    }

    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="mb-10 border-solid border-white border w-1/2 p-2  rounded-md">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <input
                        className="outline-none p-1 rounded-md text-zinc-950"
                        placeholder="nome"
                        name="name"
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="outline-none p-1 rounded-md text-zinc-950"
                        placeholder="email"
                        name="email"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-blue-400 py-2 text-zinc-950 rounded-md"
                        disabled={isLoadingPost}
                    >
                        {isLoadingPost ? "Cadastrando" : "Cadastrar"}
                    </button>
                </form>
            </div>

            <button
                type="button"
                className="bg-white text-black px-4 py-2 rounded-xl w-64"
                onClick={() => refetch()}
            >
                Listar usuários
            </button>

            {isLoading && <span>Carregando dados iniciais...</span>}
            {isPending && !isFetching && <span>Não executado...</span>}
            {isFetching && !isLoading && <span>Carregando...</span>}
            {usersError && (
                <span className="text-red-500">{usersError.toString()}</span>
            )}

            {data?.map((user) => (
                <div key={user.id}>
                    <strong className="block">{user.name}</strong>
                    <small>{user.email}</small>
                </div>
            ))}
        </div>
    );
}
