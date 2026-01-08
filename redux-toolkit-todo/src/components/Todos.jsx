import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTodo,
  toggleTodo,
  updateTodo,
} from "../features/todo/todo.slice";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    dispatch(updateTodo({ id, newText: editText }));
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <h1 className="font-bold text-3xl text-center mb-6">Todo List</h1>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white shadow-md hover:shadow-lg transition-all p-4 rounded-xl flex items-center justify-between border"
          >
            <div className="flex items-center gap-4">
              {/* Toggle Checkbox */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="w-5 h-5 accent-blue-600"
              />

              {/* Text OR Edit Input */}
              {editId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border px-3 py-1 rounded-lg w-full focus:outline-blue-500"
                />
              ) : (
                <p
                  className={`text-lg ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              {editId === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:opacity-90 active:scale-95"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEdit(todo)}
                  className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg hover:opacity-90 active:scale-95"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:opacity-90 active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {todos.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-4">
            No todos yet. Add one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Todos;
