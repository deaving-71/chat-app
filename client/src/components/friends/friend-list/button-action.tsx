"use client";

import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
type Props = {
  children: React.ReactNode;
  tooltip?: string;
};

function ButtonAction({ tooltip = "tooltip", children }: Props) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="select-none rounded-[4px] bg-background p-2 text-sm font-medium leading-none tracking-tight text-foreground shadow-[0_0_14px_-6px_var(--foreground)] transition-all will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade">
            {tooltip}
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export { ButtonAction };
