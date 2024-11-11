"use client";

import React from "react";
import {
  Dialog as BaseDialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FullscreenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  children,
}: FullscreenDialogProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <BaseDialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Click here</Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "duration-300 transition-all",
          isFullscreen && "w-screen h-screen max-w-none rounded-none p-0"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="h-9 w-9"
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-9 w-9"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "p-6",
            isFullscreen && "h-[calc(100vh-88px)] overflow-y-auto"
          )}
        >
          {children}
        </div>
      </DialogContent>
    </BaseDialog>
  );
}
