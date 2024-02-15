import { ReactNode } from "react";

interface CardProps {
  icon: ReactNode;
  title: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ icon, title, text }) => (
  <div className="mt-2 flex min-w-72 flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-neutral-200 p-8 py-2 text-neutral-950 shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
    <div className="flex items-center justify-center">
      <div className="mt-8 shrink-0">{icon}</div>
    </div>
    <div className="relative -top-6">
      <div className="text-center text-2xl font-medium text-neutral-900 dark:text-neutral-200">
        {title}
      </div>
      <p className="my-4 text-center text-lg text-neutral-950 dark:text-neutral-400">
        {text}
      </p>
    </div>
  </div>
);

export default Card;
