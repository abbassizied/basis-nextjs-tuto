
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ssg",
};
export default function SsgPage() {
    return (
        <div>
          <h1>SSG works</h1>
        </div>
      );
}