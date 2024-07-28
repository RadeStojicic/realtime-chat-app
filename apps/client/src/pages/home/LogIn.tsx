import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import AuthForm from "./_components/AuthForm";

type LogInForm = {
  username: string;
  email: string;
};

const LogIn = () => {
  const { toast } = useToast();
  const orOption = {
    text: "Don't have an account?",
    href: "/",
  };

  const form = useForm<LogInForm>({
    defaultValues: {
      username: "",
      email: "",
    },
  });
  async function onSubmit() {
    form.reset();
    toast({
      title: "You have successfully logged in!",
      description: "Welcome back!",
      duration: 2000,
    });
  }

  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-col rounded-lg sm:px-8 sm:py-12">
        <h1 className="text-3xl text-white font-semibold">Log In</h1>
        <AuthForm
          form={form}
          onSubmit={onSubmit}
          btnText="Log In"
          orOption={orOption}
        />
      </div>
    </div>
  );
};

export default LogIn;
