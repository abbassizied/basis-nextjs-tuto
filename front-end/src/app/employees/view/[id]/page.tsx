import { Metadata } from "next";
// import { useEffect, useState } from "react";
import { Suspense } from "react";
import { getEmployeeById } from "@actions/employees/get-Employee";
import { Employee } from "types/employee";

export const metadata: Metadata = {
  title: "View Employee Details",
};
export default async function ViewEmployeeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  /*
  const [employee, setEmployee] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEmployee(params.id);
      const data = response;
      setEmployee(data);
    };

    fetchData();
  }, [params.id]);
*/
  const { id } = params;
  const result = await getEmployeeById(id);
  console.log("======================> " + result);

  let employee: Employee = result;

  return (
    <div>
      <h1>View Employee Details Page</h1>
      <Suspense fallback={<p>Loading Employee Details...</p>}>
        <p>Emp Id : {employee.id}</p>
        <p>Emp lastName : {employee.lastName}</p>
        <p>Emp firstName : {employee.firstName}</p>
        <p>Emp email : {employee.email}</p>
        <p>Emp email : {employee.email}</p>
        <p>Emp email : {employee.email}</p>
        <h3>company :</h3>
        <p>company Department : {employee.company.department}</p>
        <p>company Name : {employee.company.name}</p>
        <p>company Title : {employee.company.title}</p>
      </Suspense>
    </div>
  );
}
