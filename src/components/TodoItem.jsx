import React, { useState } from "react";
import { useTodo } from "../context";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo || "");

  const {
    todos,
    updateTodo,
    deleteTodo,
    toggleComplete,
    toggleSelect,
    selectedTodos,
    selectAll,
  } = useTodo();


  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  const isSelected = selectedTodos.includes(todo.id);

   const handleCheckboxChange = () => {
    toggleComplete(todo.id);  // ✅ toggle completed
    toggleSelect(todo.id);    // ✅ toggle selected
  };

  return (
    <div
      className={`flex items-center border border-black/10 rounded-lg px-3 py-2 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      {/* ✅ Single checkbox for both */}
      <input
        type="checkbox"
        className="w-5 h-5 cursor-pointer accent-indigo-600"
        checked={isSelected}   // we drive everything off selection
        onChange={()=>toggleSelect(todo.id)}
      />

      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through text-gray-600" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Edit / Save Button */}
       <button
        className="inline-flex items-center justify-center w-8 h-8 text-sm bg-green-100 border rounded-lg border-black/10 hover:bg-green-200 shrink-0"
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.completed ? "✅" : "⭕"}
      </button>
      <button
        className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded-lg border-black/10 bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>

      {/* Delete Button */}
      <button
        className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded-lg border-black/10 bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
