import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { OTPInput } from "input-otp";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";
const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => (_jsx(OTPInput, { ref: ref, containerClassName: cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName), className: cn("disabled:cursor-not-allowed", className), ...props })));
InputOTP.displayName = "InputOTP";
const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex items-center", className), ...props })));
InputOTPGroup.displayName = "InputOTPGroup";
const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn("relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md", className), ...props }));
});
InputOTPSlot.displayName = "InputOTPSlot";
const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (_jsx("div", { ref: ref, role: "separator", ...props, children: _jsx(Dot, {}) })));
InputOTPSeparator.displayName = "InputOTPSeparator";
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
