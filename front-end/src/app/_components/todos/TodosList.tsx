"use client";

import TodoItemForm from "@components/forms/TodoItemForm";
import { Task } from "types/task"; 
import { useState, useEffect, useCallback, Suspense } from "react";

export default function TodosList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const res = await fetch("http://localhost:3000/api/todos").then((res) =>
      res.clone().json()
    );
    // console.log("========= response ======", res.data);
    return res.data;
  };

  const delTasks = async (id: number) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
    });
  };
  /************************************************************ */
  /************************************************************ */
  // declare the async data fetching function
  const fetchData = useCallback(async () => {
    const data = await getTasks();
    setTasks(data);
  }, []);

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  /******************************************************************/

  function deleteTodo(id: number) {
    console.log("delete item n° ", id);
    // ✅ You can read or write refs in event handlers
    delTasks(id);
    console.log("deletion is complete with success");
  }

  return (
    <div>
      <>
        {
          // JSON.stringify(tasks)
        }
      </>

      <h1>Todos List</h1>

      <TodoItemForm />

      <Suspense fallback={<p>Loading ...</p>}>
        {tasks.map((task: Task) => (
          <div key={task.id} className="todo-item">
            <span>{task.title}</span>
            <input type="checkbox" />
            <button
              className="btn-del"
              onClick={() => deleteTodo(Number(task.id))}
            >
              Delete
            </button>
          </div>
        ))}
      </Suspense>
    </div>
  );
}
