import { TaskList } from "@/components/task-list";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import Link from "next/link";

const HomePage = async () => {
  const tasks = await db.task.findMany();
  return (
    <div className="h-full w-full flex flex-col gap-4 justify-center items-center">
      <Link href="/create-task" legacyBehavior>
        <a className="flex gap-2"> 
          <Button>Create a new task</Button>
        </a>
      </Link>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default HomePage;
