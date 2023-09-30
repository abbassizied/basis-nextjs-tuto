import { Metadata } from "next";
import { Product } from "types/product";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Products() {
  const data = await getStaticProps();
  const products = data.props.products;

  return (
    <div>
      <h1>Products</h1>
      <p>Incremental Static Regeneration</p>
      {
        <ul>
          {products.map((product: Product) => (
            <Link
              href={`products/product/${product.id}`}
              key={product.id}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  margin: "10px",
                  padding: "10px",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <h3>{product.title} </h3>
                <h6> {product.category}</h6>
                <hr/>
                <p>{product.description}</p>
              </div>
            </Link>
          ))}
        </ul>
      }
    </div>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch("http://localhost:8000/products", {
    cache: "no-store",
  });
  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const products = await res.json();

  return {
    props: {
      products,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 3, // In seconds
  };
}
