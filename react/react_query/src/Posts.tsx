import { useQueryClient } from "@tanstack/react-query";
import { sleep } from "./sleep";
import { IUser } from "./types";
import { Link, useFetcher } from "react-router-dom";
import { useEffect } from "react";

export function Posts() {
    const queryClient = useQueryClient();

    function handleMouseEnter() {
        console.log("fez o hover");
        queryClient.prefetchQuery({
            queryKey: ["users"],
            queryFn: async (): Promise<IUser[]> => {
                await sleep();
                const res = await fetch("http://localhost:3000/users");
                return res.json();
            },
        });
    }

    return (
        <pre>
            {JSON.stringify({}, null, 2)}
            <br />
            <br />
            <Link to="/" onMouseEnter={handleMouseEnter}>
                Ir para os Usuários
            </Link>
        </pre>
    );
}
