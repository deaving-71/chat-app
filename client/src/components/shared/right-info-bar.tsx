"use client";

import dynamic from "next/dynamic";
import DefaultRightInfoBar from "./right-info-bar/default-right-info-bar";
import MobileRightInfoBar from "./right-info-bar/mobile-right-info-bar";
import { useMediaQuery } from "usehooks-ts";
import { MotionProps } from "framer-motion";

type Props = React.ComponentPropsWithRef<"aside"> & MotionProps;

function RightInfoBar(props: Props) {
  const lg = useMediaQuery("(min-width: 1024px)");

  const CurrentRightinfobar = {
    default: DefaultRightInfoBar,
    mobile: MobileRightInfoBar,
  }[lg ? "default" : "mobile"];

  return <CurrentRightinfobar {...props} />;
}

export default dynamic(() => Promise.resolve(RightInfoBar), { ssr: false });
