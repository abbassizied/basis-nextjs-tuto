
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ssr",
};
export default function SsrPage() {
    return (
        <div>
          <h1>SSR works</h1>
        </div>
      );
}