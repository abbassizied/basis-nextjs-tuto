import { NextResponse } from "next/server";
import { Task } from "types/task";
const baseUrl = "http://localhost:8000";

// get a given todo by its id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const result = await fetch(`${baseUrl}/todos/${id}`, {
    headers: {
      "Content-type": "application/json",
    },
    cache: "no-store",
  });
  const todos = await result.json();
  return NextResponse.json({ data: todos });
}

// update a given todo by its id
export async function PUT(
  request: Request,
  { params }: { params: { newTodo: Task } }
) {
  const id = params.newTodo.id;

  const result = await fetch(`${baseUrl}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(newTodo),
  });
  const newToDo = await result.json();
  return NextResponse.json(newToDo);
}



// delete a given todo by its id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const result = await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    //body: JSON.stringify(todo),
  });
  const response = await result.json();
  return NextResponse.json(response);
}
