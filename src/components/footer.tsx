import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full p-4 flex flex-row gap-1 items-center border-t">
      Built by{" "}
      <Link
        href="https://tomnyuma.rocks"
        target="_blank"
        className="underline underline-offset-4"
      >
        Tom Nyuma
      </Link>
      <Link
        href={"https://github.com/nyumat/trashzero"}
        target="_blank"
        className="underline underline-offset-4"
      >
        GitHub.
      </Link>
    </footer>
  );
}
