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
      className={cn("px-5 py-2 text-sm leading-5 font-semibold z-10 shadow-lg")}
      onClick={isSignedIn ? logout : authenticate}
    >
      {isSignedIn ? "Log out" : "Connect wallet"}
    </Button>
  );
};
