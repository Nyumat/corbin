import Link from "next/link";

interface BreadcrumbConfig {
  label: string;
  path: string;
}

export default function Breadcrumb({ routes }: { routes: BreadcrumbConfig[] }) {
  return (
    <div className="w-full text-left">
      <nav aria-label="breadcrumb" className="block w-full">
        <ol className="flex w-full flex-wrap items-center rounded-md bg-blue-gray-50 bg-opacity-60 py-2 px-4">
          {routes.map((route, index) => (
            <li
              key={index}
              className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased transition-colors duration-300 hover:text-pink-500"
            >
              <Link href={route.path}>
                <a className="opacity-60">
                  <span>{route.label}</span>
                </a>
              </Link>
              {index < routes.length - 1 && (
                <span className="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased">
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
