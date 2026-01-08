import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todo.slice";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto mt-6 px-4">
      <h1 className="font-semibold text-2xl text-center mb-4">Add Todo</h1>

      <div className="bg-white shadow-md p-6 rounded-xl ">
        <form onSubmit={handleClick} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border px-4 py-3 rounded-lg w-full focus:outline-blue-500 focus:ring-2 focus:ring-blue-300"
            placeholder="Enter your todo..."
          />

          <button
            type="submit"
            className="bg-blue-600 rounded-xl px-6 py-3 text-white font-medium hover:bg-blue-700 active:scale-95 transition-all"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
