// "use client";

import Link from "next/link";

export default function Header() {
  async function links() {
    return [
      ["Dashboard", "/"],
      ["Todos", "/todos"],
      ["Products", "/products"],
      ["Employees", "/employees"],
      ["About", "/about"],
    ].map(([title, url]) => (
      <li key={title}>
        <Link href={url}>{title}</Link>
      </li>
    ));
  }

  return <ul>{links()}</ul>;
}
