import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSignup from "../../hooks/use-signup";
import AuthForm from "./_components/AuthForm";

const SignUpSchema = z
  .object({
    username: z.string().min(6, {
      message: "Username must be at least 6 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof SignUpSchema>;

const SignUp = () => {
  const { toast } = useToast();
  const orOption = {
    text: "Already have an account? ",
    href: "/log-in",
  };

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { loading, signup } = useSignup();
  const onSubmit = async () => {
    try {
      await signup(form.getValues());
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
        <h1 className="text-3xl text-white  font-semibold">Sign Up</h1>
        <AuthForm
          form={form}
          onSubmit={onSubmit}
          btnText="Sign Up"
          orOption={orOption}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SignUp;
