import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState("light");

  // Separate completed and active tasks
  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  // Save theme to localStorage & apply class to body
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false, id: Date.now() }]);
      setTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <header>
        <h1>📝 React To-Do List</h1>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>

      <div className="input-section">
        <input
          type="text"
          value={task}
          placeholder="Enter a task"
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <section className="tasks-section">
        <h2>Active Tasks</h2>
        {activeTasks.length === 0 && <p>No active tasks</p>}
        <ul className="task-list">
          {activeTasks.map(({ id, text }) => (
            <li key={id} className="task-item">
              <span>{text}</span>
              <div>
                <button onClick={() => toggleTask(id)} aria-label="Mark completed">
                  ✓
                </button>
                <button onClick={() => deleteTask(id)} aria-label="Delete task">
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="tasks-section completed-tasks">
        <h2>Completed Tasks</h2>
        {completedTasks.length === 0 && <p>No completed tasks yet</p>}
        <ul className="task-list">
          {completedTasks.map(({ id, text }) => (
            <li key={id} className="task-item completed">
              <span>{text}</span>
              <button onClick={() => deleteTask(id)} aria-label="Delete completed task">
                🗑
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
