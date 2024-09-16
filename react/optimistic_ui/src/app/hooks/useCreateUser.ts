import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/createUser";
import { USERS_QUERY_KEY, UsersQueryData } from "./useUsers";

// export const CREATE_USER_MUTATION_KEY = ['createUser'];

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    // mutationKey: CREATE_USER_MUTATION_KEY,
    mutationFn: createUser,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    // }
    onMutate: (variables) => {
      const tmpUserId = String(Math.random());
      queryClient.setQueryData<UsersQueryData>(USERS_QUERY_KEY, (prev) => prev?.concat({ ...variables, id: tmpUserId, status: "pending" }));
      return { tmpUserId };
    },
    onSuccess: async (data, _variables, context) => {
      await queryClient.cancelQueries({queryKey: USERS_QUERY_KEY});
      queryClient.setQueryData<UsersQueryData>(USERS_QUERY_KEY, (prev) => prev?.map((user => (user.id === context.tmpUserId ? data : user))));
    },
    onError: async (_error, _variables, context) => {
      await queryClient.cancelQueries({queryKey: USERS_QUERY_KEY});
      // queryClient.setQueryData<UsersQueryData>(USERS_QUERY_KEY, (prev) => prev?.filter((user => (user.id !== context?.tmpUserId))));
      queryClient.setQueryData<UsersQueryData>(USERS_QUERY_KEY, (prev) => prev?.map((user => (user.id === context?.tmpUserId ? {...user, status: "error"} : user))));
    }
  });

  return { createAsync: mutateAsync, isLoading: isPending };
}
