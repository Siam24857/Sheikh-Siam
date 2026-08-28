"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  showDefaultIcon?: boolean;
};

type LinkProps = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonElementProps = BaseProps & {
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type PrimaryCtaButtonProps = LinkProps | ButtonElementProps;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm gap-2 rounded-xl",
  md: "px-6 py-3.5 text-base gap-2.5 rounded-xl",
  lg: "px-8 py-4 text-lg gap-3 rounded-2xl",
};

const iconSizes: Record<ButtonSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-5 h-5",
};

export default function PrimaryCtaButton(props: PrimaryCtaButtonProps) {
  const {
    children,
    className,
    size = "lg",
    icon,
    iconPosition = "right",
    showDefaultIcon = false,
  } = props;

  const isLink = "href" in props && props.href !== undefined;

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center font-bold text-white transition-all duration-300 ease-out overflow-hidden",
    "active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
    sizeClasses[size],
    className,
  );

  const content = (
    <>
      {/* Background gradient */}
      <span className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-500 to-indigo-600 transition-all duration-300 group-hover:scale-105" />

      {/* 3D Edge/Depth effect */}
      <span
        className={cn(
          "absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.2)] transition-all duration-300",
          size === "lg"
            ? "rounded-2xl shadow-[0_4px_0_0_rgba(37,99,235,1),0_8px_16px_-4px_rgba(37,99,235,0.5)] group-hover:shadow-[0_6px_0_0_rgba(37,99,235,1),0_12px_20px_-4px_rgba(37,99,235,0.6)]"
            : "rounded-xl shadow-[0_3px_0_0_rgba(37,99,235,1),0_6px_12px_-3px_rgba(37,99,235,0.5)] group-hover:shadow-[0_4px_0_0_rgba(37,99,235,1),0_8px_16px_-3px_rgba(37,99,235,0.6)]",
          "group-hover:-translate-y-0.5",
        )}
      />

      {/* Shine effect */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </span>

      {/* Content */}
      <span className="relative flex items-center gap-2">
        {iconPosition === "left" && (
          <span
            className={cn("transition-transform duration-300", iconSizes[size])}
          >
            {icon ||
              (showDefaultIcon && <ChevronRight className={iconSizes[size]} />)}
          </span>
        )}
        {children}
        {iconPosition === "right" && (
          <span
            className={cn(
              "transition-transform duration-300 group-hover:translate-x-0.5",
              iconSizes[size],
            )}
          >
            {icon ||
              (showDefaultIcon && <ChevronRight className={iconSizes[size]} />)}
          </span>
        )}
      </span>
    </>
  );

  if (isLink) {
    const { href, target, rel } = props as LinkProps;
    return (
      <Link href={href} target={target} rel={rel} className={baseClasses}>
        {content}
      </Link>
    );
  }

  const { onClick, type = "button", disabled } = props as ButtonElementProps;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        "cursor-pointer",
        disabled && "pointer-events-none",
      )}
    >
      {content}
    </button>
  );
}
