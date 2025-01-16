"use client";
import AuthForm from "@/components/AuthForm/AuthForm";
import { signup } from "@/lib/action/auth";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const page = () => (
  <div className='h-screen flex flex-col items-center justify-center'>
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullname: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signup}
    />
  </div>
);

export default page;
