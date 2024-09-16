import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Users } from "./Users";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Posts } from "./Posts";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: 5000,
            refetchOnWindowFocus: false,
            gcTime: 1000,
            enabled: false,
        },
        mutations: {},
    },
});

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ul>
                    <li>
                        <Link to="/">Usuários</Link>
                    </li>
                    <li>
                        <Link to="/posts">Posts</Link>
                    </li>
                </ul>

                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="/posts" element={<Posts />} />
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
