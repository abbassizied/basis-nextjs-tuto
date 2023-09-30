import { Metadata } from "next";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Edit Employee",
};

export default function EditEmployeePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>Edit Employee</h1>
      <Suspense fallback={<p>Loading Employee Details...</p>}>
        <p>Emp Id : {params.id}</p>
      </Suspense>
    </div>
  );
}
