import { Counter } from "./components/Counter";
import { UserProfile } from "./components/UserProfile";

function App() {

  return (
    <div  className="min-h-screen flex flex-col items-center justify-center gap-10">
      <Counter />
      <UserProfile />
    </div>
  );
}

export default App;
