import { useUsers } from "@/app/hooks/useUsers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Switch } from "./ui/Switch";
import { Skeleton } from "./ui/Skeleton";
import { useUpdateUser } from "@/app/hooks/useUpdateUser";
import { cn } from "@/app/libs/utils";

export function UsersList() {
  const { users, isLoading } = useUsers();
  const { updateAsync } = useUpdateUser();

  // const pedingMutations = useMutationState({
  //   filters: {
  //     status: "pending",
  //     mutationKey: CREATE_USER_MUTATION_KEY
  //   },
  //   select: mutation => mutation.state.variables as Omit<IUser, "id">
  // });

  async function handleBlockedChange(id: string, blocked: boolean) {
    await updateAsync({ blocked, id });
  }

  return (
    <div className="space-y-4">
      {isLoading && [...Array(3)].map((e, i) =>
        <div className="flex items-center space-x-4 h-20 border p-4 border-muted rounded-md" key={i}>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex justify-between items-center w-full  px-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-6 w-12 rounded-xl" />
          </div>
        </div>
      )}

      {users.map((user) => (
        <div
          key={user.id}
          className={cn(
            "border p-4 rounded-md flex items-center justify-between",
            user.status === "pending" && "opacity-70",
            user.status === "error" && "border-destructive bg-destructive/10"
          )}
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>

            </Avatar>
            <div>
              <strong className="text-lg block leading-3">{user.name}</strong>
              <small className="text-muted-foreground">{user.email}</small>
            </div>
          </div>
          <Switch
            checked={user.blocked}
            onCheckedChange={(blocked) => handleBlockedChange(user.id, blocked)}
            disabled={user.status === "pending" || user.status === "error"}
          />
        </div>
      ))}

      {/* {pedingMutations.map((user) => (
        <div
          key={String(Math.random())}
          className="border p-4 rounded-md flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>

            </Avatar>
            <div>
              <strong className="text-lg block leading-3">{user.name}</strong>
              <small className="text-muted-foreground">{user.email}</small>
            </div>
          </div>
          <Switch
            checked={user.blocked}
            disabled
          />
        </div>
      ))} */}
    </div>
  );
}
