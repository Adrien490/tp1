"use client"
import { Task } from "@prisma/client";
import axios from "axios";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const router = useRouter();
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/task/${id}`);

      router.refresh();
    } catch (error) {
      console.error("An error occurred while deleting the task:", error);
    }
  };
  return (
    <div className="h-3/4 w-[400px] flex-col overflow-y-auto flex items-center gap-3 px-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="py-4 rounded-lg border-2 w-full px-3 flex flex-col gap-2"
        >
          <h2 className="text-xl font-bold">{task.title}</h2>
          <p className="text-gray-700">{task.description}</p>
          <Link href={`/update-task/${task.id}`} legacyBehavior>
            <a className="text-blue-500 hover:text-blue-700 flex items-center">
              <Edit2 size={20} className="mr-1" />{" "}
              <span>Edit</span>{" "}
            </a>
          </Link>
          <button
            className="text-red-500 hover:text-red-700 flex items-center"
            onClick={() => handleDelete(task.id)}
          >
            <Trash2 size={20} className="mr-1" />
            <span>Delete</span>{" "}
          </button>
          {task.dueDate && (
            <p className="text-sm text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
