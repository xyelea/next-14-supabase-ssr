import React from "react";
import CreateForm from "./components/CreateForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import readUserSession from "@/lib/action";
import { redirect } from "next/navigation";
import SignOut from "./components/SignOut";

export default async function Page() {
  // Membuat variabel todos yang berisi array dari objek-objek todo
  const todos = [
    {
      title: "Subscribe",
      created_by: "091832901830",
      id: "101981908",
      completed: false,
    },
  ];
  // Membuat variabel data yang menyimpan hasil dari fungsi readUserSession
  const { data } = await readUserSession();
  // Jika data.session tidak ada, berarti pengguna belum masuk
  if (!data.session) {
    return redirect("/auth-server-action");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 space-y-5">
        <SignOut />
        <CreateForm />
        {/* // Menggunakan metode map untuk mengulang setiap elemen dari variabel */}
        todos
        {todos?.map((todo, index) => {
          return (
            <div key={index} className="flex items-center gap-6">
              <h1
                className={cn({
                  "line-through": todo.completed,
                })}>
                {todo.title}
              </h1>

              <Button>delete</Button>
              <Button>Update</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
