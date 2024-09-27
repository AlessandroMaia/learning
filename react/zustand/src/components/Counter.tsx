import { useStore } from "@/store";
import { Button } from "./Button";
import { useShallow } from "zustand/react/shallow";

export function Counter() {
  const { counter, increment } = useStore(
    useShallow(state => ({
      counter: state.counter.value,
      increment: state.counter.increment,
    }))
  );

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-3xl font-bold">Counter: {counter}</h1>
      <Button type="button" onClick={increment}>Incrementar</Button>
    </div>
  );
}
