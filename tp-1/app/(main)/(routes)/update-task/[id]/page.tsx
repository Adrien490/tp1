import { TaskForm } from "@/components/task-form";
import db from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface UpdateTaskPageProps {
  params: {
    id: string;
  };
}

const UpdateTaskPage = async ({ params }: UpdateTaskPageProps) => {
  const task = await db.task.findUnique({
    where: {
      id: Number(params.id),
    },
  });


  return (
    <div className="h-full flex flex-col gap-4 items-center justify-center">
      <Link className="" href="/">
        <ArrowLeft />
        Retour
      </Link>
      <TaskForm initialData={task} />
    </div>
  );
};

export default UpdateTaskPage;
