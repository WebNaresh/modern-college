"use client";

import InputField from "@/components/AuthComponets/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import useStore from "@/hooks/loader-hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Email is not Valid" }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

const LoginForm = () => {
  const { data } = useSession();
  const { setLoadingFalse, setLoadingTrue } = useStore();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (data?.user) {
    }
  }, [data, router, toast]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoadingTrue();
    console.log(values);
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        console.log(`🚀 ~ res:`, res);
        if (res?.error?.includes("CredentialsSignin")) {
          console.log(
            `🚀 ~ res?.error?.includes("CredentialsSignin"):`,
            res?.error?.includes("CredentialsSignin")
          );

          toast({
            title: "Email of Password is not matching",
            description: "Sorry",
            variant: "destructive",
          });
        } else if (
          res?.error?.includes(
            "Can't reach database server at `db.ufodydbovxinkjdxorny.supabase.co`:`5432`\n"
          )
        ) {
          toast({
            title: "Server is under Maintainance",
            description: "Sorry",
            variant: "destructive",
          });
        } else {
          router.push("/");
          toast({
            title: "Login Succesfull",
            description: `Welcome ${data?.user?.name}`,
          });
        }
      })
      .catch((res) => {
        console.log(`🚀 ~ res:`, res);
        if (res?.error?.includes("CredentialsSignin")) {
          toast({
            title: "Email of Password is not matching",
            description: "Sorry",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Something went wrong",
            description: "Try after sometime",
            variant: "destructive",
          });
        }
      })
      .finally(() => {
        setLoadingFalse();
      });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <InputField
            form={form}
            name="email"
            label="E-mail"
            type="email"
            placeholder="Enter your email"
            desc=" This is your public display email."
          />
          <InputField
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            desc=" This is your public display password."
          />

          <Button className="w-full text-white" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
