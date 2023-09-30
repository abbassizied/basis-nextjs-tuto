"use client";

import { useEffect, useState } from "react";
import { Task } from "types/task";

export default function TodoItemForm() {
  const [newtodo, setnewtodo] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnewtodo(e.target.value);
  };

  const handleAdd = (e: React.MouseEvent<HTMLElement>) => {
    if (newtodo) {
      e.preventDefault();
      console.log(newtodo);
      addItem();
      setnewtodo("");
    }
    if (!newtodo) {
      e.preventDefault();
      alert("Please write smth to add item!!!!");
      return;
    }
  };

  async function addItem() {
    const task: Task = {
      title: newtodo,
      completed: false,
    };
    await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then(() => {
      console.log("new item is added ...");
    });
  }

  return (
    <div className="todo-add-item">
      <form>
        <input
          type="text"
          placeholder="✍️ Add new item..."
          name="newtodo"
          value={newtodo}
          onChange={handleChange}
        />
        <button className="btn-add" onClick={handleAdd}>
          Add Todo
        </button>
      </form>
    </div>
  );
}
