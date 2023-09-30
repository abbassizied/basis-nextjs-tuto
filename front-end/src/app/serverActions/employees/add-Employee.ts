import { Employee } from "types/employee";
 
/*
 * This function gets the employee object which it then sends to the /employees endpoint via a POST request.
 * It then forces the cache to refresh content associated with the "employees" tag, and redirects back to the EmployeesPage.
 */
export default async function addEmployee(employee: Employee) {
  "use server";

  await fetch("http://localhost:8000/employees", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
    next: { tags: ["employee"] /*revalidate: 10 */ },
  });
}
