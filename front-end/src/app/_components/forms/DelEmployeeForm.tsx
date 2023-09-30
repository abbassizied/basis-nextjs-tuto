import { deleteEmployee } from "@actions/employees/delete-Employee";
//import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default function DelEmployeeForm(props: { employeeId: number }) {
  async function handleSubmit(e: FormData) { 
    const id: number = Number(e.get("id"));
    await deleteEmployee(id);
    //revalidateTag("employee");
    redirect("/employees");
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" value={props.employeeId} name="id" />
      <button type="submit" className="list-item-btn-delete">
        Delete
      </button>
    </form>
  );
}
