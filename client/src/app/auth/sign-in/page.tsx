"use client";

import { Button, Input } from "@/components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialSchema } from "@/lib/schemas";
import { login } from "@/lib/actions";
import { logExceptions } from "@/lib/utils";
import { FormError } from "@/components/shared";
import { LoginCredentials } from "@/types";
import { useAuth } from "@/hooks";

export default function Login() {
  const { signIn } = useAuth();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    defaultValues: {
      username: undefined,
      password: undefined,
    },
    resolver: zodResolver(credentialSchema),
  });

  const onSubmit: SubmitHandler<LoginCredentials> = (data) => {
    logExceptions(async () => {
      const response = await signIn(data);
      console.log(response);
    });
  };

  return (
    <form className="w-[350px] p-4" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="mb-4 grid grid-cols-1 grid-rows-[auto,auto,20px]">
        <label
          htmlFor="username"
          className="mb-[0.625rem] block text-[0.8125rem] leading-[1]"
        >
          Username
        </label>
        {/* @ts-ignore >>> typescript bug */}
        <Input variant="outline" size="md" {...register("username")} />
        {errors.username && <FormError error={errors.username.message} />}
      </fieldset>
      <fieldset className="mb-4 grid grid-cols-1 grid-rows-[auto,auto,20px]">
        <label
          htmlFor="password"
          className="mb-[0.625rem] block text-[0.8125rem] leading-[1]"
        >
          Password
        </label>
        <Input
          variant="outline"
          // @ts-ignore >>> typescript bug
          size="md"
          type="password"
          {...register("password")}
        />
        {errors.password && <FormError error={errors.password.message} />}
      </fieldset>
      <Button className="mb-2 px-8 py-[0.375rem]">Login</Button>
    </form>
  );
}
