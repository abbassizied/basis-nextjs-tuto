import TodosList from "@components/todos/TodosList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crud with route handlers",
};
export default function CrudWithRouteHandlersPage() {
  return (
    <div>
      <h1>Crud with route handlers</h1>
      <hr/>
      <TodosList />
    </div>
  );
}
