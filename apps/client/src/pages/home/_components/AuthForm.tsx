import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

export const ContactSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const AuthForm = ({
  form,
  onSubmit,
  btnText,
  orOption,
}: {
  form: UseFormReturn<any>;
  onSubmit: () => void;
  btnText: string;
  orOption: {
    text: string;
    href: string;
  };
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full sm:w-[400px] mt-8 max-w-2xl flex-col"
      >
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-[6px]">
                <FormLabel className="text-sm font-medium text-white">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="py-6 border-none bg-foreground text-white"
                    placeholder="you@example.com"
                    {...field}
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
              <FormItem className="space-y-[6px]">
                <FormLabel className="text-sm font-medium text-white">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="py-6 border-none bg-foreground text-white"
                    placeholder="At least 8 characters"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" variant="default" size="lg" className="mt-6 py-6">
          {btnText}
        </Button>
        <div className="my-6 flex w-full items-center text-center text-accent">
          <div className="flex-1 border-b border-foreground"></div>
          <p className="mx-2 text-sm">Or</p>
          <div className="flex-1 border-b border-foreground"></div>
        </div>

        <p className="flex items-center justify-center text-white gap-1">
          {orOption.text}
          <Link to={orOption.href} className="text-primary">
            {orOption.href === "/log-in" ? "Log In" : "Sign Up"}
          </Link>
        </p>

        <Toaster />
      </form>
    </Form>
  );
};

export default AuthForm;
