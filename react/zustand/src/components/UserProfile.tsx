import { useStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

export function UserProfile() {
  const { user, setUsername } = useStore(
    useShallow(state => ({
      user: state.user.data,
      setUsername: state.user.setUsername,
    }))
  );

  const form = useForm({
    defaultValues: {
      username: user?.username,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log("🚀 ~ handleSubmit ~ data.username:", data.username);
    setUsername(data.username);
  });

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Avatar>
        <AvatarImage
          src={`https://github.com/${user.username}.png`}
          alt={`@${user.username}`}
        />
        <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <Input {...form.register("username")} />
        <Button className="w-full">Salvar</Button>
      </form>
    </div>
  );
}
