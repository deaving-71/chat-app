"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button, Input } from "../ui";
import { XmarkRX } from "@/lib/utils/icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError, FormSuccess } from "../shared";
import { z } from "zod";
import { useSocket } from "@/context";
import { AcknowledgementCallback, FriendRequestQueryResponse } from "@/types";
import { useState } from "react";

type TForm = { username: string };

function AddFriend() {
  const schema = z.object({
    username: z.string().min(1, "Please enter a username first"),
  });
  const {
    register,
    setError,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
    },
  });
  const { socket, appendFriendRequestsSent } = useSocket();
  const [formSuccessMsg, setFormSuccessMsg] = useState<null | string>(null);
  const onSubmit: SubmitHandler<TForm> = (data) => {
    try {
      const ack: AcknowledgementCallback<FriendRequestQueryResponse> = ({
        data,
        message,
        success,
      }) => {
        if (success) {
          setFormSuccessMsg(message);
          appendFriendRequestsSent({
            id: data.id,
            receiver: data.receiver,
            receiverId: data.receiverId,
            senderId: data.senderId,
          });
        } else {
          setError("username", { message });
        }
      };

      socket?.emit("friends:send-request", data.username, ack);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Add Friend</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-bold text-foreground">
            Add Friend
          </Dialog.Title>
          <Dialog.Description className="pb-2 pt-[10px] text-[15px] leading-normal text-foreground-secondary">
            Enter the username of the person you would like to add as a friend.
          </Dialog.Description>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-rows-[30px,auto]"
          >
            <div>
              <FormError message={errors.username?.message ?? ""} />
              <FormSuccess message={formSuccessMsg ?? ""} />
            </div>
            <fieldset className="flex items-center rounded-md bg-muted p-2 shadow-[0_0_0_1px_var(--muted-border)] focus-within:shadow-[0_0_0_2px_var(--muted-border)]">
              <Input
                className=" h-8  w-full text-sm"
                {...register("username")}
              />
              <Button
                className="h-8 cursor-pointer whitespace-nowrap text-[12px] capitalize disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
                disabled={!isDirty || !isValid}
              >
                Send friend request
              </Button>
            </fieldset>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => {
                reset();
                setFormSuccessMsg(null);
              }}
            >
              <XmarkRX />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { AddFriend };
