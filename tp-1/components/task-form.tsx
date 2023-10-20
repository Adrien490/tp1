"use client";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; // Corrigé 'next/navigation' à 'next/router'
import { CheckCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Task } from "@prisma/client";

// Définition du schéma pour une tâche
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  category: z.string().min(1, {
    message: "category is required.",
  }),
  description: z.string().optional(), // La description peut être facultative
  dueDate: z.string().min(1, {
    // Pour la simplicité, nous utilisons une chaîne, mais vous pourriez vouloir une validation de date plus stricte
    message: "Deadline is required.",
  }),
});

interface TaskFormProps {
  initialData?: Task | null;
}

export const TaskForm = ({ initialData }: TaskFormProps) => {

    
  const router = useRouter();
  const categories = ["Work", "Hobbies"];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      category: "",
      description: "",
      dueDate: "",
      
    },
  });

  

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const adjustedDate = new Date(values.dueDate).toISOString();

      // Créez un nouvel objet représentant la tâche, avec la date ajustée
      const taskWithAdjustedDate = {
        ...values,
        dueDate: adjustedDate, // Remplacez par la date ajustée
      };
      // Ici, vous enverriez les données à votre API pour la création de tâche
      // Remplacer cette URL par le point de terminaison approprié pour votre backend
      if (initialData) {
        await axios.patch(`/api/task/${initialData.id}`, taskWithAdjustedDate);
      } else {
        await axios.post("/api/task", taskWithAdjustedDate);
      }

      router.refresh();

      router.push("/"); // Redirigez vers la page de liste de tâches ou tout autre chemin approprié
    } catch (error) {
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 space-y-8 pb-10">
        <div className="space-y-8">
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">New Task</h3>
              <p className="text-sm text-muted-foreground">
                Details about the task
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Title of the task"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    rows={3}
                    placeholder="Task description (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="dueDate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline</FormLabel>
                <FormControl>
                  <Input type="date" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading} type="submit">
              Create Task
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
