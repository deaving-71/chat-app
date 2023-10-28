"use client";

import React, { useEffect, useState } from "react";

function useMediaQuery(min: number) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return windowWidth > 0 && windowWidth < min;
}

export { useMediaQuery };
