import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './context'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'



function App() {
  const [todos, setTodos] = useState([])

  const [selectedTodos, setSelectedTodos] = useState([]); 

  const addTodo =(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  }

  const updateTodo = (id, todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ? todo : prevTodo)))
  }

  const deleteTodo = (id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id !== id))
    setSelectedTodos((prev) => prev.filter((todoId) => todoId !== id)); 
  }

  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id=== id ?{...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }


   const toggleSelect = (id) => {
    setSelectedTodos((prev) =>
      prev.includes(id) ? prev.filter((todoId) => todoId !== id) : [...prev, id]
    );
  };


  const deleteSelectedTodos = () => {
    setTodos((prev) => prev.filter((todo) => !selectedTodos.includes(todo.id)));
    setSelectedTodos([]); 
  };

  const selectAll = () => {
  if (selectedTodos.length === todos.length) {
    setSelectedTodos([]);
  } else {
    setSelectedTodos(todos.map((t) => t.id));
  }
};


  useEffect(()=>{
   const todos = JSON.parse(localStorage.getItem('todos'))
   if(todos && todos.length>0){
    setTodos(todos)
   }
  },[])

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])


  return (
      <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete, toggleSelect, selectedTodos , deleteSelectedTodos, selectAll}}
    >
      <div className="min-h-screen px-4 py-10 pt-50 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
        
        <div className="w-full max-w-2xl p-6 mx-auto shadow-xl bg-white/90 backdrop-blur-md rounded-2xl">
          <h1 className="mb-6 text-3xl font-bold text-center text-indigo-800">
            CREATE YOUR <b><u>TO-DO</u></b> LIST
          </h1>

         <TodoForm />
          {todos.length>0 &&(
          <div className="flex items-center justify-between mt-6">
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      className="w-5 h-5 accent-indigo-600"
      checked={selectedTodos.length === todos.length && todos.length > 0}
      onChange={selectAll}
    />
    <span>Select All</span>
  </label>
</div>
)}

          {/* Delete Selected Button */}
          {selectedTodos.length > 0 && (
            <div className="flex justify-end mt-4">
              <button
                onClick={deleteSelectedTodos}
                className="px-5 py-2 font-medium text-white transition bg-red-600 shadow-md rounded-xl hover:bg-red-700 focus:ring focus:ring-red-300"
              >
                Delete {selectedTodos.length} Selected
              </button>
            </div>
          )}
          {todos.length > 0 && (
            <div className="flex justify-end mt-2">
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete all todos?")) {
                    setTodos([]);
                    setSelectedTodos([]);
                  }
                }}
                className="px-5 py-2 font-medium text-white transition bg-gray-600 shadow-md rounded-xl hover:bg-gray-700 focus:ring focus:ring-gray-300"
              >
                Clear All
              </button>
            </div>
          )}

          <div className="flex flex-col gap-3 mt-1">
            {todos.length > 0 ? (
              todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
              <p className="text-center text-gray-500">No tasks yet. Add your first to-do!</p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
