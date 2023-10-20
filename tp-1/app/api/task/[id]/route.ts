import db from "@/lib/db";
import { NextResponse } from "next/server";


// La méthode PATCH pour mettre à jour une tâche spécifique par son ID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    // Extrait l'ID de la tâche depuis le chemin de la requête

    // Analyse le corps de la requête pour les données de mise à jour
    const updates = await req.json();

    // Met à jour la tâche dans la base de données
    const updatedTask = await db.task.update({
      where: { id: Number(params.id) },
      data: {
        ...updates, // Étalez les champs mis à jour ici. Assurez-vous de valider ces champs.
      },
    });

    // Renvoie la tâche mise à jour
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      
  
      const task = await db.task.delete({
        where: {
          id: Number(params.id)
        }
      });
  
      return NextResponse.json(task);
    } catch (error) {
      console.log("[COMPANION_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };
