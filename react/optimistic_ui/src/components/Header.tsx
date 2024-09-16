import { ThemeToggle } from "./ThemeToggle";

export function Header(){
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="font-bold text-3xl -tracking-wider">Optimistic UI</h1>
        <small className="text-muted-foreground">Gerenciamento de usuários</small>
      </div>

      <ThemeToggle />
    </header>
  );
}
