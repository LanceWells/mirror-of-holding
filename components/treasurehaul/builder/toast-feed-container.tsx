"use client";

import ToastFeed from "@/components/toast/toast-feed";
import { removeToast, useToastSelector } from "@/lib/store/treasure-haul";
import { useDispatch } from "react-redux";

export default function ToastFeedContainer() {
  const toasts = useToastSelector();
  const dispatch = useDispatch();

  const onCloseToast = (toastKey: string) => {
    dispatch(removeToast({
      toastKey,
    }));
  }

  return (
    <ToastFeed
      onCloseToast={onCloseToast}
      toasts={toasts}
    />
  )
}
