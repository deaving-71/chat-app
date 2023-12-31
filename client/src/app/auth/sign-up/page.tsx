"use client";

import { Button, Input } from "@/components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/schemas";
// import { register } from "@/lib/actions";
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
      username: "",
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    try {
      // const response = await register(data);
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="w-[550px] p-4" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex gap-2">
        <div className="mb-4 grid basis-1/2 grid-cols-1 grid-rows-[auto,auto,20px]">
          <label
            htmlFor="username"
            className="mb-[0.625rem] block text-[0.8125rem] leading-[1]"
          >
            Username
          </label>
          {/* @ts-ignore >>> typescript bug */}
          <Input variant="outline" size="md" {...register("username")} />
          <FormError message={errors.username?.message ?? ""} />
        </div>
        <div className="mb-4 grid basis-1/2 grid-cols-1 grid-rows-[auto,auto,20px]">
          <label
            htmlFor="name"
            className="mb-[0.625rem] block text-[0.8125rem] leading-[1]"
          >
            Name
          </label>
          {/* @ts-ignore >>> typescript bug */}
          <Input variant="outline" size="md" {...register("name")} />
          <FormError message={errors.name?.message ?? ""} />
        </div>
      </fieldset>

      <fieldset className="mb-4 grid grid-cols-1 grid-rows-[auto,auto,20px]">
        <label
          htmlFor="email"
          className="mb-[0.625rem] block text-[0.8125rem] leading-[1]"
        >
          Email
        </label>
        <Input
          variant="outline"
          // @ts-ignore >>> typescript bug
          size="md"
          {...register("email")}
        />
        <FormError message={errors.email?.message ?? ""} />
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
        <FormError message={errors.password?.message ?? ""} />
      </fieldset>
      <fieldset className="mb-4 grid grid-cols-1 grid-rows-[auto,auto,20px]">
        <label
          htmlFor="confirm_password"
          className="mb-[0.625rem] block text-[0.8125rem] leading-[1]"
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

        <FormError message={errors.confirm_password?.message ?? ""} />
      </fieldset>

      <Button className="mb-2 px-8 py-[0.375rem]">Join in</Button>
    </form>
  );
}
