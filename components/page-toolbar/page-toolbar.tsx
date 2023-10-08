"use client";

import clsx from "clsx";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useMemo } from "react";
import Spinner from "../spinner/spinner";
import Image from "next/image";

export type PageToolbarProps = {};

export default function PageToolbar() {
  const session = useSession();

  useEffect(() => {
    console.debug(session);
  }, [session]);

  const avatar = useMemo(() => {
    if (!session) {
      return (<>...</>)
    }
    switch (session.status) {
      case 'loading': return (<Spinner className="w-4 h-4" />);
      case 'unauthenticated': return (
        <button
          className={clsx(
            ['bg-cyan-600'],
            ['text-white'],
            ['p-2'],
            ['rounded-lg'],
          )}
          onClick={() => signIn('discord')}
        >
          Sign in
        </button>
      );
      case 'authenticated': return (
        <button
          onClick={() => signOut()}
        >
          <Image
            className={clsx(
              'rounded-full',
            )}
            width={32}
            height={32}
            src={session.data.user?.image || ''}
            alt="Profile Picture"
          />
        </button>
      )
    }
  }, [session])

  return (
    <div className={clsx(
      ['absolute', 'top-0', 'w-screen', 'h-14', 'px-4'],
      ['bg-white', 'dark:bg-slate-800'],
      ['shadow-sm'],
      ['border-b', 'dark:border-black'],
      ['grid', 'items-center', 'justify-between', 'grid-cols-[max-content_max-content]'],
    )}>
      <h1 className="text-black dark:text-white">
        Mirror Of Holding
      </h1>
      {avatar}
    </div>
  );
}
