import { useToast } from "@/components/ui/use-toast";
import useLogin from "@/hooks/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthForm from "./_components/AuthForm";

const LogInSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type LogInSchema = z.infer<typeof LogInSchema>;

const LogIn = () => {
  const { toast } = useToast();
  const orOption = {
    text: "Don't have an account?",
    href: "/sign-up",
  };

  const form = useForm<z.infer<typeof LogInSchema>>({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { loading, login } = useLogin();

  const onSubmit = async () => {
    try {
      await login(form.getValues());
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: "Unable to sign up.",
        duration: 2000,
      });
    }
  };
  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-col rounded-lg sm:px-8 sm:py-12">
        <h1 className="text-3xl text-white font-semibold">Log In</h1>
        <AuthForm
          form={form}
          onSubmit={onSubmit}
          btnText="Log In"
          orOption={orOption}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default LogIn;
