"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import coding from "../../app/assets/coding.png";
import Link from "next/link";

const formSchema = z.object({
  fname: z.
  string()
  .min(2,{message: "String must contain at least 2 character(s)"}),
  lname: z.
  string()
  .min(2,{message: "String must contain at least 2 character(s)"}),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fname: "", lname: "", email: "", password: "" },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    toast({ title: "Form submitted successfully" });
    router.push("/");
  };

  return (
  
<>
   
  
        <Card  className="w-[400px]">
          <CardHeader>
            <CardTitle>Join Managers Now!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
   <FormField
                  control={form.control}
                  name="fname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-100 border-0 focus-visible:ring-0 text-black dark:text-white"
                          placeholder="First Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
   <FormField
                  control={form.control}
                  name="lname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-100 border-0 focus-visible:ring-0 text-black dark:text-white"
                          placeholder="Last Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />



                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-100 border-0 focus-visible:ring-0 text-black dark:text-white"
                          placeholder="Email"
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
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="bg-slate-100 border-0 focus-visible:ring-0 text-black dark:text-white"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-[#007BFF] text-white no-underline py-2 px-4 rounded hover:bg-[#0056b3] transition duration-200 ease-in-out"
                >
                  Join
                </Button>

                <CardFooter>
                  Already have an account?
                  <Link href="/" className="text-[#007BFF] no-underline ml-2">
                    Sign in
                  </Link>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
        </>
  );
};

export default RegisterForm;
