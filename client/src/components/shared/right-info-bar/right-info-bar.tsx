"use client";

import DefaultRightInfoBar from "./default-right-info-bar";
import MobileRightInfoBar from "./mobile-right-info-bar";
import { useMediaQuery } from "usehooks-ts";
import { MotionProps } from "framer-motion";

type Props = React.ComponentPropsWithRef<"aside"> & MotionProps;

export default function RightInfoBar(props: Props) {
  const lg = useMediaQuery("(min-width: 1024px)");

  const CurrentRightinfobar = {
    default: DefaultRightInfoBar,
    mobile: MobileRightInfoBar,
  }[lg ? "default" : "mobile"];

  return <CurrentRightinfobar {...props} />;
}
