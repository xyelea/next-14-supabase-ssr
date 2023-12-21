// Mengimpor fungsi zodResolver dari modul @hookform/resolvers/zod
import { zodResolver } from "@hookform/resolvers/zod";
// Mengimpor fungsi useForm dari modul react-hook-form
import { useForm } from "react-hook-form";
// Mengimpor semua fungsi dari modul zod
import * as z from "zod";
// Mengimpor ikon loading dari modul react-icons/ai
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// Mengimpor komponen-komponen UI form dari direktori lokal
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// Mengimpor komponen input dari direktori lokal
import { Input } from "@/components/ui/input";
// Mengimpor fungsi toast dari direktori lokal
import { toast } from "@/components/ui/use-toast"; // Mengimpor komponen button dari direktori lokal
import { Button } from "@/components/ui/button";
// Mengimpor fungsi cn dari direktori lokal
import { cn } from "@/lib/utils";
// Mengimpor fungsi signUpWithEmailAndPassword dari direktori lokal
import { signUpWithEmailAndPassword } from "../actions";
// Membuat skema validasi form dengan menggunakan zod
const FormSchema = z
  .object({
    // Email harus berupa string dan valid
    email: z.string().email(),
    // Password harus berupa string dan minimal 6 karakter
    password: z.string().min(6, {
      message: "Password harus berupa huruf dan 6 karakter.",
    }),
    // Confirm harus berupa string dan minimal 6 karakter
    confirm: z.string().min(6, {
      message: "Password harus berupa huruf dan 6 karakter.",
    }),
  })
  // Password dan confirm harus sama
  .refine((data) => data.confirm === data.password, {
    message: "Password did not match",
    path: ["confirm"],
  });
export default function RegisterForm() {
  // Membuat form dengan menggunakan useForm hook
  const form = useForm<z.infer<typeof FormSchema>>({
    // Menggunakan zodResolver untuk validasi form berdasarkan skema
    resolver: zodResolver(FormSchema),
    // Mengatur nilai awal form
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });
  // Fungsi untuk menangani submit form
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Memanggil fungsi signUpWithEmailAndPassword dengan data form
    const result = await signUpWithEmailAndPassword(data);
    // Mengurai hasil menjadi objek JSON
    const { error } = JSON.parse(result);
    // Jika ada error, menampilkan toast dengan pesan error
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      // Jika tidak ada error, menampilkan toast dengan pesan sukses
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Pendaftaran berhasil</code>
          </pre>
        ),
      });
    }
  }

  return (
    // Mengembalikan komponen form dengan properti form
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full flex gap-2">
          Register
          <AiOutlineLoading3Quarters className={cn("animate-spin")} />
        </Button>
      </form>
    </Form>
  );
}
