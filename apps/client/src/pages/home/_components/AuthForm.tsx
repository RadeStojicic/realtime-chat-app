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
  const fields = Object.keys(form.getValues());

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full sm:w-[400px] mt-8 max-w-2xl flex-col"
      >
        <div className="flex flex-col gap-5">
          {fields.includes("username") && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-[5px]">
                  <FormLabel className="text-sm font-medium text-white">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 border-none bg-foreground text-white"
                      placeholder="Type your username..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {fields.includes("email") && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-[5px]">
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
          )}
          {fields.includes("password") && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-[5px]">
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
          )}
          {fields.includes("confirmPassword") && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-[5px]">
                  <FormLabel className="text-sm font-medium text-white">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="py-6 border-none bg-foreground text-white"
                      placeholder="Re-enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
