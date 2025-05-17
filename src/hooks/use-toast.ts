"use client";

import * as React from "react";
import { toast as sonnerToast } from "@/components/ui/toast";
import type { Toast as ToastType } from "@/components/ui/toast";

export type Toast = ToastType;

const TOAST_LIMIT = 20;
const TOAST_REMOVE_DELAY = 5000;

type ToasterToast = Toast & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: string;
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // Dismiss all toasts
      if (toastId === undefined) {
        return {
          ...state,
          toasts: state.toasts.map((t) => ({
            ...t,
            open: false,
          })),
        };
      }

      // Dismiss a specific toast
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }

    case "REMOVE_TOAST": {
      const { toastId } = action;

      if (toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== toastId),
      };
    }
  }
};

export const useToast = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    toasts: [],
  });

  React.useEffect(() => {
    state.toasts.forEach((toast) => {
      if (toast.id && !toast.open && !toastTimeouts.has(toast.id)) {
        const timeout = setTimeout(() => {
          toastTimeouts.delete(toast.id);
          dispatch({
            type: "REMOVE_TOAST",
            toastId: toast.id,
          });
        }, TOAST_REMOVE_DELAY);

        toastTimeouts.set(toast.id, timeout);
      }
    });
  }, [state.toasts]);

  const toast = React.useCallback(
    (props: Omit<ToasterToast, "id"> & { id?: string }) => {
      const id = props.id || genId();
      const newToast = { ...props, id };

      // Also trigger the sonner toast for UI display
      if (props.variant === "destructive") {
        sonnerToast.error(props.title as string, {
          description: props.description as string,
          id,
        });
      } else {
        sonnerToast(props.title as string, {
          description: props.description as string,
          id,
        });
      }

      dispatch({
        type: "ADD_TOAST",
        toast: {
          ...newToast,
          open: true,
        },
      });

      return id;
    },
    [dispatch]
  );

  const update = React.useCallback(
    (props: ToasterToast) => {
      dispatch({
        type: "UPDATE_TOAST",
        toast: props,
      });
    },
    [dispatch]
  );

  const dismiss = React.useCallback(
    (toastId?: string) => {
      dispatch({
        type: "DISMISS_TOAST",
        toastId,
      });
    },
    [dispatch]
  );

  return {
    toasts: state.toasts,
    toast,
    dismiss,
    update,
  };
};

// Also export a simpler toast function for direct use
export { sonnerToast as toast };
