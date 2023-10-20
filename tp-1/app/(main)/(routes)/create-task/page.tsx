"use client"
import { TaskForm } from "@/components/task-form"
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"

const CreateTaskPage=()=>{

    return (
        <div className="h-full flex flex-col gap-4 items-center justify-center">
            <Link className="" href="/">
                <ArrowLeft />
                Retour
                </Link>
            <TaskForm />
        </div>
    )
}

export default CreateTaskPage