import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

const App = () => {
  return (
    <div className="p-16">
      <AddTodo />
      <Todos />
    </div>
  );
};

export default App;
