import NewEmployeeForm from "@components/forms/NewEmployeeForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Employee",
};

export default function AddEmployeePage() {
  return (
    <div>
      <h1>Add Employee Page</h1>
      <NewEmployeeForm />
    </div>
  );
}
