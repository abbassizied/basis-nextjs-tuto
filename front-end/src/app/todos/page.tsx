/* The Next.js App Router allows you to fetch data directly in your React components by marking the function as async and using await for the Promise.
 * Next.js extends the fetch options object to allow each request to set its own caching and revalidating.
 *  For now, if you need to fetch data in a Client Component, we recommend using a third-party library.
 *
 *
 */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todos",
};
export default function Todos() {
  return (
    <div>
      <h1>main ToDos page</h1>
    </div>
  );
}
