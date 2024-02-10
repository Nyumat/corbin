import { ReactNode } from "react";

interface CardProps {
  icon: ReactNode;
  title: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ icon, title, text }) => (
  <div className="flex flex-col items-center justify-center mt-2 py-2 dark:text-white text-neutral-950 bg-neutral-200 dark:bg-neutral-800 rounded-3xl p-8 shadow-lg min-w-72 border border-neutral-200 dark:border-neutral-700">
    <div className="flex items-center justify-center">
      <div className="flex-shrink-0 mt-8">{icon}</div>
    </div>
    <div className="relative -top-6">
      <div className="text-2xl font-medium dark:text-neutral-200 text-neutral-900 text-center">
        {title}
      </div>
      <p className="text-neutral-950 dark:text-neutral-400 text-lg text-center my-4">
        {text}
      </p>
    </div>
  </div>
);

export default Card;
