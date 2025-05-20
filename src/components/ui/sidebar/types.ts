
import { ButtonHTMLAttributes, ReactNode } from "react";
import { TooltipContentProps } from "@radix-ui/react-tooltip";

export type SidebarMenuButtonProps = {
  asChild?: boolean;
  isActive?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  tooltip?: string | Omit<TooltipContentProps, "ref">;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type SidebarTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;
