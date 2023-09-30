import Link from "next/link";

export default function TodosLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          color: "black",
          margin: "20px",
          padding: "20px",
          width: "100vh",
          height: "200px",
        }}
      >
        <h1>Todos</h1>
        <ul>
          <li>
            <Link href="/todos/crud-w-route-handlers">Crud with route handlers</Link>
          </li>
          <li>
            <Link href="/todos/isr">ISR</Link>
          </li>
          <li>
            <Link href="/todos/ssg">SSG</Link>
          </li>
          <li>
            <Link href="/todos/ssr">SSr</Link>
          </li>
        </ul>
      </div>

      {children}
    </>
  );
}
