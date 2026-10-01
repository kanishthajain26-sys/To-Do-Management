
import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.trim() === "") return;

    if (editId !== null) {
      setTodos(
        todos.map((item) =>
          item.id === editId ? { ...item, text: todo } : item
        )
      );

      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: todo,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }

    setTodo("");
  };

 
  const deleteTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

 
  const toggleTodo = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };


  const editTodo = (item) => {
    setTodo(item.text);
    setEditId(item.id);
  };


  const filteredTodos = todos.filter((item) => {
    if (filter === "active") {
      return !item.completed;
    }

    if (filter === "completed") {
      return item.completed;
    }

    return true;
  });

  const remainingTodos = todos.filter(
    (item) => !item.completed
  ).length;

  return (
    <div className="app">
      <div className="todo-container">

        <h1>My Todo List</h1>
        <p className="subtitle">
          Organize your tasks and stay productive 🚀
        </p>

    
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            placeholder="What do you want to do?"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />

          <button type="submit">
            {editId !== null ? "Update" : "Add"}
          </button>
        </form>


        <div className="filters">
          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "active" ? "active-filter" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={filter === "completed" ? "active-filter" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="todo-count">
          <span>{todos.length} Total</span>
          <span>{remainingTodos} Remaining</span>
        </div>


        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">📝</div>
              <h3>No todos found</h3>
              <p>Add a new task to get started.</p>
            </div>
          ) : (
            filteredTodos.map((item) => (
              <div
                className={`todo-item ${
                  item.completed ? "completed" : ""
                }`}
                key={item.id}
              >
                <div className="todo-left">
                  <button
                    className="check-btn"
                    onClick={() => toggleTodo(item.id)}
                  >
                    {item.completed ? "✓" : ""}
                  </button>

                  <span className="todo-text">
                    {item.text}
                  </span>
                </div>

                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => editTodo(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;