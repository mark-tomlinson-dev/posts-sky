"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AppBskyActorDefs } from "@atproto/api";
import { agent } from "../lib/api";

interface MainLayoutProps {
  mainContent: React.ReactNode;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export function MainLayout({
  mainContent,
  isAuthenticated = false,
  onLogout,
}: MainLayoutProps) {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();
  const [profile, setProfile] =
    useState<AppBskyActorDefs.ProfileViewDetailed | null>(null);

  console.log("Current pathname:", pathname);

  useEffect(() => {
    if (isAuthenticated) {
      agent
        .getProfile({ actor: agent.session?.handle as string })
        .then(({ data }) => setProfile(data))
        .catch(console.error);
    }
  }, [isAuthenticated]);

  return (
    <div className="grid grid-cols-[minmax(60px,_300px)_604px_300px] max-[800px]:grid-cols-[60px_1fr] w-full max-w-[calc(300px+604px+300px)] max-[800px]:max-w-none mx-auto min-h-screen">
      <div className="flex flex-col items-end">
        <nav
          className="sticky top-0 flex flex-col"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex items-center justify-center transition-colors rounded-full w-15 h-15 hover:bg-hover"
            aria-label="Home"
            role="menuitem"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.25 23H16v-5.75a1 1 0 00-1-1h-2a1 1 0 00-1 1V23H6.75A1.75 1.75 0 015 21.25v-7.894c0-.94.429-1.83 1.172-2.436l6.838-5.57a1.577 1.577 0 011.98 0l6.838 5.57A3.144 3.144 0 0123 13.356v7.894A1.75 1.75 0 0121.25 23z"
                fill={
                  segment === null ? "var(--grey1)" : "var(--nav-icon-color)"
                }
              />
            </svg>
          </Link>
          <Link
            href="/notifications"
            className="flex items-center justify-center transition-colors rounded-full w-15 h-15 hover:bg-hover"
            aria-label="Notifications"
            role="menuitem"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 20l-.421-7.421C21.158 7.947 18.186 5 14 5s-7.158 2.947-7.579 7.579L6 20h4.76a3.25 3.25 0 006.48 0H22zM7.588 18.5l.33-5.81c.187-2.016.916-3.553 1.94-4.575C10.878 7.098 12.277 6.5 14 6.5c1.723 0 3.123.598 4.142 1.615 1.024 1.022 1.753 2.559 1.94 4.575l.33 5.81H7.589zm8.144 1.5h-3.464a1.75 1.75 0 003.464 0z"
                fill={
                  segment === "notifications"
                    ? "var(--grey1)"
                    : "var(--nav-icon-color)"
                }
              />
            </svg>
          </Link>
          {profile && (
            <Link
              href={`/${profile.handle}`}
              className="flex items-center justify-center mt-auto transition-colors rounded-full w-15 h-15 hover:bg-hover"
              aria-label="Your profile"
              role="menuitem"
            >
              <Image
                src={profile.avatar || "/default-avatar.png"}
                alt="Your profile"
                width={28}
                height={28}
                className="rounded-full"
              />
            </Link>
          )}
        </nav>
        {/* posts-supporter-heart */}
        {/* <div className="p-1 bg-posts-yellow-wash rounded-4xl place-items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.22 9.204c-.531-.815-.886-1.69-.886-2.577 0-1.794 1.373-3.167 3.167-3.167.703 0 1.324.288 1.82.747l.68.627.678-.627c.497-.46 1.118-.747 1.822-.747 1.793 0 3.166 1.373 3.166 3.167 0 .887-.355 1.763-.885 2.575l-.001.002c-.529.812-1.235 1.564-1.939 2.204a19.99 19.99 0 01-2.81 2.123l-.015.01a.041.041 0 01-.033 0l-.016-.01a19.996 19.996 0 01-2.81-2.12c-.703-.644-1.409-1.396-1.938-2.207z"
              fill="color(display-p3 1 0.72 0.12 / 1)"
            ></path>
          </svg>
        </div> */}
      </div>
      <div className="feed border-x border-border-primary">{mainContent}</div>
      <div className="p-6 max-[800px]:hidden">
        <p>PostsSky</p>
        <p className="text-xs text-text-tertiary">
          An ode to the community app by Read.cv
        </p>
        {isAuthenticated && onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="px-3 py-1.5 mt-4 text-xs text-text-primary bg-button-secondary rounded-lg h-8 cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
