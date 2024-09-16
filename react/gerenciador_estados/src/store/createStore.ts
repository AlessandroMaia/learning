import { useSyncExternalStore } from 'react';

type SetterFn<TState> = (prevState: TState) => Partial<TState>;
type SetStateFn<TState> = (
  partialState: Partial<TState> | SetterFn<TState>,
) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createStore<TState extends Record<string, any>>(
  create: (setter: SetStateFn<TState>, getter: () => TState) => TState,
) {
  let state: TState;
  let listeners: Set<() => void>;

  function notifyListeners() {
    listeners.forEach((listener) => listener());
  }

  function set(partialState: Partial<TState> | SetterFn<TState>) {
    const newValue =
      typeof partialState === 'function' ? partialState(state) : partialState;

    state = {
      ...state,
      ...newValue,
    };

    notifyListeners();
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  function get() {
    return state;
  }

  function useStore<TValue>(
    selector: (currentState: TState) => TValue,
  ): TValue {
    return useSyncExternalStore(subscribe, () => selector(state));
  }

  state = create(set, get);
  listeners = new Set<() => void>();

  return useStore;
}
