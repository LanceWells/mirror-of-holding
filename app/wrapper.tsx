"use client";

import { store } from "@/lib/store";
import React from "react";
import { Provider } from "react-redux";

export default function AppWrapper(props: React.PropsWithChildren<{}>) {
  const {children} = props;

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
