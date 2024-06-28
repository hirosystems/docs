"use client";

import React from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

export const ConnectWalletButton: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [session, setSession] = React.useState({}) as any;

  const authenticate = () => {
    showConnect({
      appDetails: {
        name: "My App",
        icon: window.location.origin + "/my-app-logo.svg",
      },
      redirectTo: "/",
      onFinish: () => {
        const userData = userSession.loadUserData();
        setIsSignedIn(true);
        setSession(userSession);
        console.log(userData);
      },
      userSession: userSession,
    });
  };

  const logout = () => {
    session.signUserOut();
    setIsSignedIn(false);
  };

  return (
    <Button
      className={cn(
        "px-5 py-2 text-sm leading-5 rounded-full font-semibold z-10",
        "bg-neutral-900 text-white",
        "dark:bg-white dark:text-neutral-900",
        "hover:bg-neutral-900/90 dark:hover:bg-gray-100/90"
      )}
      onClick={isSignedIn ? logout : authenticate}
    >
      {isSignedIn ? "Log out" : "Connect wallet"}
    </Button>
  );
};
