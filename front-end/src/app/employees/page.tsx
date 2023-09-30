import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import EmployeesList from "@components/employees/EmployeesList";

export const metadata: Metadata = {
  title: "Employees",
};
export default function EmployeesPage() {
  return (
    <>
      <h1>Employees Page</h1>
      <Link href="employees/add">Add Employee</Link>

      <hr />
      <h2>What Are Server Actions?</h2>
      <p>
        ==&gt; are functions that run on your server, and you can then call them
        from client or server components.
      </p>
      <hr />
      <p>
        for more details on server actions{" "}
        <a href="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions">
          please, open this link
        </a>
      </p>
      <ul>
        <li>add-Employee.ts </li>
        <li>update-Employee.ts</li>
        <li>get-Employee.ts</li>
        <li>getAll-Employee.ts</li>
        <li>delete-Employee.ts</li>
      </ul>
      <Suspense fallback={<p>Loading ...</p>}>
        <EmployeesList />
      </Suspense>
    </>
  );
}
