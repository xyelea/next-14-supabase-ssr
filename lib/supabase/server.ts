// Menggunakan direktif "use server" untuk menandai bahwa kode ini berjalan di sisi server
"use server";

// Mengimpor fungsi cookies dari modul next/headers
import { cookies } from "next/headers";
// Mengimpor fungsi createServerClient dan tipe CookieOptions dari modul @supabase/ssr
import { createServerClient, CookieOptions } from "@supabase/ssr";

// Mengekspor fungsi createSupabaseServerClient yang bersifat async
export default async function createSupabaseServerClient() {
  // Membuat variabel cookieStore yang menyimpan hasil dari fungsi cookies()
  const cookieStore = cookies();

  // Mengembalikan hasil dari fungsi createServerClient dengan parameter berikut:
  // - URL dan kunci anonim dari Supabase, yang diambil dari variabel lingkungan
  // - Objek yang memiliki properti cookies, yang berisi fungsi-fungsi untuk mengelola cookie
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Fungsi untuk mendapatkan nilai cookie berdasarkan nama
        get(name: string) {
          // Mengembalikan nilai cookie dari cookieStore, atau undefined jika tidak ada
          return cookieStore.get(name)?.value;
        },

        // Fungsi untuk mengatur nilai cookie berdasarkan nama, nilai, dan opsi
        set(name: string, value: string, options: CookieOptions) {
          // Memanggil fungsi cookieStore.set dengan objek yang berisi nama, nilai, dan opsi
          cookieStore.set({ name, value, ...options });
        },
        // Fungsi untuk menghapus cookie berdasarkan nama dan opsi
        remove(name: string, options: CookieOptions) {
          // Memanggil fungsi cookieStore.set dengan objek yang berisi nama, nilai kosong, dan opsi
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}
