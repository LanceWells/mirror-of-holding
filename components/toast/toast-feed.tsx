"use client"

import { removeToast, useToastSelector } from "@/lib/store/treasure-haul";
import clsx from "clsx";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastEntry } from "./toast-types";
import { CloseIcon, CopyIcon, SuccessIcon } from "../svgs";
import { Tooltip } from "flowbite-react";

export default function ToastFeed() {
  const toasts = useToastSelector();
  const dispatch = useDispatch();

  const closeToast = (key: string) => {
    dispatch(
      removeToast({ toastKey: key }),
    );
  }

  const toastContainers = useMemo(() => toasts.map(([key, value], i) => {
    let icon = (<></>);
    switch (value.icon) {
      case 'success': {
        icon = (
          <div className='bg-green-500 flex rounded-lg p-1'>
            <SuccessIcon className='w-8 h-8 fill-white' />
          </div>
        );
        break;
      }
    }

    return (
      <ToastContainer
        toastKey={key}
        onClose={closeToast}
        toast={value}
        toastIndex={i}
        key={key}
        icon={icon}
      />
    );
  }), [toasts])

  return (
    <div className={clsx(
      ['absolute', 'top-0', 'md:right-0'],
      ['flex', 'flex-col'],
    )}>
      {toastContainers}
    </div>
  );
}

type ToastContainerProps = {
  onClose: (key: string) => void,
  toastKey: string,
  toast: ToastEntry,
  toastIndex: number,
  icon: ReactNode,
}

function ToastContainer(props: ToastContainerProps) {
  const {
    onClose,
    toastKey,
    toast,
    icon,
  } = props;
  
  const [copyText, setCopyText] = useState('Copy URL');

  useEffect(() => {
    if (toast.duration) {
      setTimeout(() => onClose(toastKey), toast.duration);
    }
  }, []);

  const onClickCopy = () => {
    if (!toast.url) { return; }

    navigator.clipboard.writeText(toast.url)
      .then(() => {
        setCopyText('Copied!');
      });
  }

  return (
    <div
      className={clsx(
        ['bg-white', 'dark:bg-slate-600'],
        ['text-black', 'dark:text-gray-50'],
        ['border', 'border-gray-300', 'dark:border-0'],
        ['drop-shadow-md'],
        ['w-[full]', 'md:w-[400px]'],
        ['rounded-lg'],
        ['m-2', 'p-2'],
        ['animate-fold_in'],
        [
          'grid',
          'grid-cols-[min-content_1fr_min-content]',
          'grid-rows-[1fr_min-content]',
          'gap-x-2',
          'gap-y-2',
          'items-center',
        ],
        ['z-30'],
        ['transition-all'],
      )}
      style={{
        gridTemplateAreas: `
          "icon   text  close-icon"
          "url    url   url"
        `,
      }}>
      <button
        onClick={() => onClose(toastKey)}
        className={clsx(
          ['m-1', 'p-1'],
          ['bg-slate-300', 'hover:bg-slate-200', 'dark:bg-slate-800', 'dark:hover:bg-slate-700'],
          ['rounded-full'],
          ['w-10', 'h-10', 'md:w-6', 'md:h-6'],
          ['[grid-area:close-icon]']
        )}>
        <CloseIcon className={clsx(
          ['fill-gray-900', 'dark:fill-gray-50'],
          ['w-8', 'h-8', 'md:w-4', 'md:h-4'],
        )} />
      </button>
      <div className={clsx(
        ['[grid-area:icon]'],
        ['relative'],
      )}>
        {icon}
      </div>
      <span className={clsx(
        ['relative'],
        ['text-lg'],
        ['m-1'],
      )}>
        {toast.text}
      </span>
      <div className={clsx(
        ['[grid-area:url]'],
        ['bg-slate-700', 'text-white'],
        ['text-center'],
        ['p-1', 'm-1'],
        ['rounded-lg'],
        ['grid', 'grid-cols-[1fr_min-content]', 'items-center'],
        toast.url
          ? 'visible'
          : 'hidden'
      )}>
        <input className={clsx(
          ['bg-black'],
          ['p-0', 'mr-2'],
        )}
          type="text"
          value={`${toast.url}`}
        />
        <Tooltip content={copyText}>
          <button

            onMouseLeave={() => {
              // The tooltip changes before it disappears, so changing the text immediately makes it
              // flash, which aint purdy.
              setTimeout(() => setCopyText('Copy URL'), 100)
            }}
            onClick={onClickCopy}
            className="bg-white rounded-lg translate-y-[2px]"
          >
            <CopyIcon className='fill-black w-6 h-6' />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
