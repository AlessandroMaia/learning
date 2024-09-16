import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { IUser } from "../types";
import { sleep } from "../sleep";

export function useUsers (options?: Partial<UseQueryOptions<IUser[]>>) {
    return useQuery(
        {
            queryKey: ["users"],
            queryFn: async (): Promise<IUser[]> => {
                await sleep();
                const res = await fetch("http://localhost:3000/users");
                // throw new Error("teste");
                return res.json();
            },
            ...options,
            gcTime: 1000000
        }
    )
}
