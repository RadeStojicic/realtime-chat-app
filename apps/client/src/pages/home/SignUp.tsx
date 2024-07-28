import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import AuthForm from "./_components/AuthForm";

type SignUpForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const { toast } = useToast();
  const orOption = {
    text: "Already have an account? ",
    href: "/log-in",
  };
  const form = useForm<SignUpForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit() {
    form.reset();
    toast({
      title: "You have successfully signed!",
      description: "We will get back to you soon.",
      duration: 2000,
    });
  }

  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-col rounded-lg sm:px-8 sm:py-12">
        <h1 className="text-3xl text-white  font-semibold">Sign Up</h1>
        <AuthForm
          form={form}
          onSubmit={onSubmit}
          btnText="Sign Up"
          orOption={orOption}
        />
      </div>
    </div>
  );
};

export default SignUp;
