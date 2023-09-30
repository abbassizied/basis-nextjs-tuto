"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Employee } from "types/employee";
import { getAllEmployees } from "@actions/employees/getAll-Employee";
import DelEmployeeForm from "@components/forms/DelEmployeeForm";
//import { deleteEmployee } from "@actions/employees/delete-Employee";

/*
export async function handleDeleteEmployee(e: FormData) {
  let id = e.get("id")?.toString();
  await deleteEmployee(id);
}

export async  function fetchData () {
  const response = await getAllEmployees();
  const data = response;
  return data;
}
*/

// Server Action being called inside a Client Component
export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await getAllEmployees();
      console.log("================> " + data);
      // set state with the result
      setEmployees(data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  // const  employees = await getAllEmployees();

  return (
    <>
      {employees.map((employee: Employee) => (
        <div className="list-item" key={employee.id}>
          <h6>
            {employee.firstName} | {employee.lastName}
          </h6>
          <Link
            href={`/employees/view/${employee.id}`}
            className="list-item-btn-view"
          >
            View
          </Link>
          <Link
            href={`/employees/edit/${employee.id}`}
            className="list-item-btn-edit"
          >
            Edit
          </Link>

          <DelEmployeeForm employeeId={Number(employee.id)}/>
{
  /*
          <form action={deleteEmployee}>
            <input type="hidden" value={employee.id} name="id" />
            <button type="submit" className="list-item-btn-delete">
              Delete
            </button>
          </form>  
  */  
}

        </div>
      ))}
    </>
  );
}
