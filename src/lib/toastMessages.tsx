
import React from 'react';
import { toast } from "@/hooks/use-toast";
import type { ToastProps } from "@/components/ui/toast";
import type { Translations } from '@/hooks/useTranslations';
import { 
  AlertCircle, 
  CheckCircle, 
  Info, 
  X, 
  AlertTriangle, 
  Download, 
  Shield, 
  Lightbulb,
  ArrowUpRight,
  Send
} from "lucide-react";

export type ToastType = 
  | "info" 
  | "success" 
  | "warning" 
  | "error" 
  | "update" 
  | "tip" 
  | "validation" 
  | "crash"
  | "notImplemented" 
  | "insufficientPlans";

interface ToastData {
  title: string;
  description?: string;
  variant: "default" | "destructive" | "success" | "warning" | "info";
  icon?: React.ReactNode;
  showClose?: boolean;
  autoClose?: boolean;
}

const toastVariants = {
  info: {
    icon: <Info className="h-5 w-5 text-blue-400" />,
    variant: "info" as const,
    accentColor: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20"
  },
  success: {
    icon: <CheckCircle className="h-5 w-5 text-green-400" />,
    variant: "success" as const,
    accentColor: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20"
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
    variant: "warning" as const,
    accentColor: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/20"
  },
  error: {
    icon: <X className="h-5 w-5 text-red-400" />,
    variant: "destructive" as const,
    accentColor: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/20"
  },
  update: {
    icon: <Download className="h-5 w-5 text-blue-400" />,
    variant: "info" as const,
    accentColor: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20"
  },
  tip: {
    icon: <Lightbulb className="h-5 w-5 text-blue-400" />,
    variant: "info" as const,
    accentColor: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20"
  },
  validation: {
    icon: <Shield className="h-5 w-5 text-red-400" />,
    variant: "destructive" as const,
    accentColor: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/20"
  },
  crash: {
    icon: <AlertCircle className="h-5 w-5 text-red-400" />,
    variant: "destructive" as const,
    accentColor: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/20"
  }
};

const typeToVariant: Record<string, keyof typeof toastVariants> = {
  info: "info",
  success: "success", 
  warning: "warning",
  error: "error",
  update: "update",
  tip: "tip",
  validation: "validation",
  crash: "crash",
  notImplemented: "crash",
  insufficientPlans: "warning"
};

const predefinedMessages: Record<string, ToastData> = {
  "data-export-ready": {
    title: "The data export you requested is ready!",
    variant: "info",
    showClose: true
  },
  
  "software-update": {
    title: "A new software update is available.",
    description: "See what's new in version 2.0.",
    variant: "info",
    showClose: true
  },
  
  "did-you-know": {
    title: "Did you know?",
    description: "Here's something you'd like to know.",
    variant: "info",
    showClose: true
  },
  
  "upload-success": {
    title: "Successfully uploaded!",
    variant: "success",
    showClose: true
  },
  
  "no-credits": {
    title: "You have no credits left!",
    description: "Upgrade to continue.",
    variant: "warning"
  },
  
  "password-weak": {
    title: "Warning Your password strength is too low",
    variant: "warning",
    showClose: true
  },
  
  "submission-error": {
    title: "There was a problem with your submission",
    description: "Must include at least 1 number\nMust include at least 2 uppercase letters",
    variant: "destructive",
    showClose: false
  },
  
  "crash-error": {
    title: "Whoops! Something went wrong",
    variant: "destructive"
  },
  
  "custom-code-warning": {
    title: "Custom code is not validated",
    description: "Incorrect code may impact your website's performance",
    variant: "warning"
  }
};

const getToastData = (type: ToastType, translations?: Translations): ToastData => {
  if (predefinedMessages[type]) {
    const variantKey = typeToVariant[predefinedMessages[type].variant] || "info";
    return {
      ...predefinedMessages[type],
      icon: toastVariants[variantKey]?.icon
    };
  }
  
  if (translations?.toasts) {
    const { toasts } = translations;
    
    switch (type) {
      case "notImplemented":
        return {
          title: toasts.notImplemented.title,
          description: toasts.notImplemented.description,
          variant: "destructive",
          icon: toastVariants.crash.icon,
          showClose: true
        };
      case "insufficientPlans":
        return {
          title: toasts.insufficientPlans.title,
          description: toasts.insufficientPlans.description,
          variant: "warning",
          icon: toastVariants.warning.icon
        };
      default:
        return {
          title: "Error",
          description: "An unknown error occurred.",
          variant: "destructive",
          icon: toastVariants.crash.icon,
          showClose: true
        };
    }
  }
  
  return {
    title: "Notification",
    variant: "info",
    icon: toastVariants.info.icon,
    showClose: true
  };
};

export const showToast = (type: ToastType, translations?: Translations) => {
  const data = getToastData(type, translations);
  if (data) {
    toast(data);
  }
};

export const showCustomToast = (data: Omit<ToastData, 'variant'> & { type: ToastType }) => {
  const variantKey = typeToVariant[data.type] || "info";
  const variantData = toastVariants[variantKey];
  const toastData: ToastData = {
    ...data,
    variant: variantData.variant,
    icon: data.icon || variantData.icon
  };
  
  toast(toastData);
};

export { toastVariants, predefinedMessages };
export type { ToastData };
