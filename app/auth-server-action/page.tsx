// Mengimpor modul React dari paket react
import React from "react";
// Mengimpor komponen AuthForm dari direktori lokal
import { AuthForm } from "./components/AuthForm";
// Mengimpor fungsi readUserSession dari direktori lokal
import readUserSession from "@/lib/action";
// Mengimpor fungsi redirect dari modul next/navigation
import { redirect } from "next/navigation";
// Mengekspor fungsi page yang bersifat async
export default async function page() {
  // Membuat variabel data yang menyimpan hasil dari fungsi readUserSession
  const { data } = await readUserSession();
  // Jika data.session ada, berarti pengguna sudah masuk
  if (data.session) {
    // Mengembalikan hasil dari fungsi redirect ke halaman "/todo"
    return redirect("/todo");
  }
  // Jika data.session tidak ada, berarti pengguna belum masuk
  // Mengembalikan komponen div dengan properti className
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <AuthForm />
      </div>
    </div>
  );
}
