"use client";

import { Button, Input } from "@/components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/schemas";
import { signup } from "@/lib/actions";
import { FormError } from "@/components/shared";
import { SignupForm } from "@/types";

export default function Signup() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    defaultValues: {
      username: undefined,
      name: undefined,
      email: undefined,
      password: undefined,
      confirm_password: undefined,
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    try {
      const response = await signup(data);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="p-4 w-[550px]" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex gap-2">
        <div className="grid grid-cols-1 grid-rows-[auto,auto,20px] mb-4 basis-1/2">
          <label
            htmlFor="username"
            className="text-[0.8125rem] leading-[1] mb-[0.625rem] block"
          >
            Username
          </label>
          {/* @ts-ignore >>> typescript bug */}
          <Input variant="outline" size="md" {...register("username")} />
          {errors.username && <FormError error={errors.username.message} />}
        </div>
        <div className="grid grid-cols-1 grid-rows-[auto,auto,20px] mb-4 basis-1/2">
          <label
            htmlFor="name"
            className="text-[0.8125rem] leading-[1] mb-[0.625rem] block"
          >
            Name
          </label>
          {/* @ts-ignore >>> typescript bug */}
          <Input variant="outline" size="md" {...register("name")} />
          {errors.name && <FormError error={errors.name.message} />}
        </div>
      </fieldset>

      <fieldset className="grid grid-cols-1 grid-rows-[auto,auto,20px] mb-4">
        <label
          htmlFor="email"
          className="text-[0.8125rem] leading-[1] mb-[0.625rem] block"
        >
          Email
        </label>
        <Input
          variant="outline"
          // @ts-ignore >>> typescript bug
          size="md"
          {...register("email")}
        />
        {errors.email && <FormError error={errors.email.message} />}
      </fieldset>
      <fieldset className="grid grid-cols-1 grid-rows-[auto,auto,20px] mb-4">
        <label
          htmlFor="password"
          className="text-[0.8125rem] leading-[1] mb-[0.625rem] block"
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
      <fieldset className="grid grid-cols-1 grid-rows-[auto,auto,20px] mb-4">
        <label
          htmlFor="confirm_password"
          className="text-[0.8125rem] leading-[1] mb-[0.625rem] block"
        >
          Confirm Password
        </label>
        <Input
          variant="outline"
          // @ts-ignore >>> typescript bug
          size="md"
          type="password"
          {...register("confirm_password")}
        />
        {errors.confirm_password && (
          <FormError error={errors.confirm_password.message} />
        )}
      </fieldset>

      <Button className="px-8 py-[0.375rem] mb-2">Join in</Button>
    </form>
  );
}
