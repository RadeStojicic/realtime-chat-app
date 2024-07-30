import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useGetConversations from "@/hooks/use-getConversations";
import useConversation from "@/store/useConversation";
import { useForm } from "react-hook-form";
import { TConversation } from "./Conversations";

const SearchBar = () => {
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });

  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const onSubmit = () => {
    const search = form.getValues("search");
    if (!search) {
      return;
    }
    const conversation = conversations.find((conversation: TConversation) =>
      conversation.username.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
    }
  };
  return (
    <Form {...form}>
      <form
        className="border-b p-3 border-foreground"
        onChange={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Search for a user..."
                  className="py-6 border-none bg-foreground text-white"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchBar;
