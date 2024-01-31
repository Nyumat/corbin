"use client";
import { useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";

const Tasks = ({
  serverTasks,
}: {
  serverTasks: {
    _id: string;
    text: string;
  }[];
}) => {
  const tasks = useQuery(api.tasks.get);

  return (
    <ul>
      {(tasks || serverTasks)?.map((task) => (
        <li key={task._id}>{task.text}</li>
      ))}
    </ul>
  );
};

export default Tasks;
