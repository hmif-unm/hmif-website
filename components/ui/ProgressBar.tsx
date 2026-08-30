"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function AppProgressBar() {
  return (
    <ProgressBar
      height="3px"
      color="#FA0000"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
