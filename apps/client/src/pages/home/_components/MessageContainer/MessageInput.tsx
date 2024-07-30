import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSendMessage from "@/hooks/use-sendMessage";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

const MessageInput = () => {
  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

  const { loading, sendMessage } = useSendMessage();

  const onSubmit = async () => {
    if (!form.getValues("message")) {
      return;
    }
    await sendMessage(form.getValues("message"));
    form.setValue("message", "");
  };

  return (
    <Form {...form}>
      <div className="flex items-center gap-2 p-3 absolute bottom-2 w-full">
        <form
          className="w-full border-foreground"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    className="py-6 border-none bg-foreground text-white"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
        {loading ? (
          <Button
            className="32 py-6 border-none flex items-center gap-1"
            disabled
          >
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button
            className="w-32 py-6 border-none flex items-center gap-1"
            onClick={onSubmit}
          >
            Send
          </Button>
        )}
      </div>
    </Form>
  );
};

export default MessageInput;
