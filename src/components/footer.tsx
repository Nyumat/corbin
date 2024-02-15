import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full flex-row items-center gap-1 border-t p-4">
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
