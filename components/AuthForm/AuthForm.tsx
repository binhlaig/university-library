"use client";

import { object, z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Link from "next/link";
import { ImageUpscale, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FIELD_NAMES, FIELD_TYPES, PLACEHLODER_TYPES } from "@/constants";
import ImageUpload from "../ImageUpload";
import { toast } from "@/hooks/use-toast";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const isSignIn = type === "SIGN_IN";
  const router = useRouter();

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {

    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "You have successfully signed in."
          : "You have successfully signed up.",
      });

      router.push("/");
    } else {
      toast({
        title: `Error ${isSignIn ? "signing in" : "signing up"}`,
        description: result.error ?? "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className=" gap-1">
        <CardTitle className="text-xl text-blue-800 font-bold">
          {isSignIn ? "Bin Hlaig Book က ကြိုဆိုပါသည်။" : "အကောင့်အသစ်ဖန်တီးရန်"}
        </CardTitle>
        <CardDescription className="text-green-600">
          {isSignIn
            ? "မိတ်ဆွေရဲ့ အချိန်ကို စာအုပ်ဖြင့် ရင်းနှီးပါ၊"
            : "မိတ်ဆွေ! လိုအပ်သော အချက်အလတ်များကို  ဖြည့်သွင်းပါ။"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 w-full"
          >
            {Object.keys(defaultValues).map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FormLabel>
                    <FormControl>
                      {field.name === "universityCard" ? (
                        <ImageUpload onFileChange={field.onChange} />
                      ) : (
                        <Input
                          required
                          type={
                            FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                          }
                          placeholder={PLACEHLODER_TYPES[field.name as keyof  typeof PLACEHLODER_TYPES]}
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoaderCircle size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          {isSignIn
            ? "မိတ်ဆွေ! အကောင့် အသစ် ဖန်းတီးရန်?"
            : " မိတ်ဆွေ အကောင့်ရှိပါသလား?"}

          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="text-blue-500 font-bold hover:underline"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
