import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'



const baseUrl = "http://localhost:8000";
 

//get all todos
export const GET = async (req: NextRequest, res: NextResponse) => {
  const result = await fetch(`${baseUrl}/todos`, {
    headers: {
      "Content-type": "application/json",
    },
    cache: "no-store",
  });
  const todos = await result.json();

  const path = req.nextUrl.searchParams.get('path') || '/todos/crud-w-route-handlers'
  revalidatePath(path)
  return NextResponse.json({revalidated: true, data: todos });
};



// create new todo
export const POST = async (req: NextRequest, res: Response) => {
  const todo = await req.json();
  console.log(todo);
  const result = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newToDo = await result.json();

  const path = req.nextUrl.searchParams.get('path') || '/todos/crud-w-route-handlers'
  revalidatePath(path)
  return NextResponse.json({revalidated: true, data: newToDo });
};
