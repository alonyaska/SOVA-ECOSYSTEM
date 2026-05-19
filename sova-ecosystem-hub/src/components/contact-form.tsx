import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "имя обязательно").max(64),
  email: z.string().email("некорректный email"),
  message: z.string().min(10, "минимум 10 символов").max(2000),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Сообщение отправлено!");
    console.log("Contact form:", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
          name
        </label>
        <input
          {...register("name")}
          placeholder="твоё имя"
          className="w-full rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
        />
        {errors.name && (
          <p className="mt-1 font-mono text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
          email
        </label>
        <input
          {...register("email")}
          placeholder="tvoi@email.com"
          className="w-full rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
        />
        {errors.email && (
          <p className="mt-1 font-mono text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
          message
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="твоё сообщение..."
          className="w-full resize-y rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
        />
        {errors.message && (
          <p className="mt-1 font-mono text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-mono text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
      >
        <span>&gt;</span>
        {isSubmitting ? "sending..." : "send message"}
      </button>
    </form>
  );
}
