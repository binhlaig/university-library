"use client";
import AuthForm from "@/components/AuthForm/AuthForm";
import { signInWithCredentials } from "@/lib/action/auth";
import { signInSchema } from "@/lib/validations";
import React from "react";

const Sign_In = () => (
  <div className='h-screen flex flex-col items-center justify-center'>
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials}
    />
  </div>
);

export default Sign_In;
