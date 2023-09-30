import { Metadata } from "next";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Product Details",
};

export default function ProductIdPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Product Details Page</h1>
      <Suspense fallback={<p>Loading Product Details...</p>}>
        <p>Product Id : {params.id}</p>
      </Suspense>
    </div>
  );
}
