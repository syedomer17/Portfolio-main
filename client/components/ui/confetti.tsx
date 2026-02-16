"use client";

import type { ReactNode } from "react";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti";
import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";

type Api = {
  fire: (options?: ConfettiOptions) => void;
};

type Props = React.ComponentPropsWithRef<"canvas"> & {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
  children?: ReactNode;
};

export type ConfettiRef = Api | null;

const ConfettiContext = createContext<Api>({} as Api);

const defaultBurst: ConfettiOptions = {
  particleCount: 70,
  spread: 70,
  startVelocity: 35,
  ticks: 200,
  gravity: 1.05,
  scalar: 0.9,
  colors: ["#39d353", "#22c55e", "#0ea5e9", "#f97316", "#e11d48"],
};

// Define component first
const ConfettiComponent = forwardRef<ConfettiRef, Props>((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    ...rest
  } = props;
  const instanceRef = useRef<ConfettiInstance | null>(null);

  const canvasRef = useCallback(
    (node: HTMLCanvasElement) => {
      if (node !== null) {
        if (instanceRef.current) return;
        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true,
        });
      } else {
        if (instanceRef.current) {
          instanceRef.current.reset();
          instanceRef.current = null;
        }
      }
    },
    [globalOptions]
  );

  const fire = useCallback(
    async (opts = {}) => {
      try {
        await instanceRef.current?.({ ...defaultBurst, ...options, ...opts });
      } catch (error) {
        console.error("Confetti error:", error);
      }
    },
    [options]
  );

  const api = useMemo(
    () => ({
      fire,
    }),
    [fire]
  );

  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) {
      (async () => {
        try {
          await fire();
        } catch (error) {
          console.error("Confetti effect error:", error);
        }
      })();
    }
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} {...rest} />
      {children}
    </ConfettiContext.Provider>
  );
});

// Set display name immediately
ConfettiComponent.displayName = "Confetti";

// Export as Confetti
export const Confetti = ConfettiComponent;

interface ConfettiButtonProps extends React.ComponentProps<"button"> {
  options?: ConfettiOptions &
    ConfettiGlobalOptions & { canvas?: HTMLCanvasElement };
  fireOnClick?: boolean;
  trigger?: boolean;
}

const ConfettiButtonComponent = ({
  options,
  fireOnClick = true,
  trigger,
  children,
  ...props
}: ConfettiButtonProps) => {
  const triggerRef = useRef(false);

  const runBurst = useCallback(
    async (origin?: { x: number; y: number }) => {
      const baseOrigin = origin ?? { x: 0.5, y: 0.5 };
      const burst = (overrides: ConfettiOptions) =>
        confetti({
          ...defaultBurst,
          ...options,
          ...overrides,
          origin: baseOrigin,
        });

      await burst({ particleCount: 60, spread: 60, startVelocity: 38 });
      await burst({ particleCount: 40, spread: 100, startVelocity: 28, decay: 0.92 });
      await burst({ particleCount: 25, spread: 140, startVelocity: 20, scalar: 0.8 });
    },
    [options]
  );

  useEffect(() => {
    if (trigger && !triggerRef.current) {
      runBurst().catch((error) => {
        console.error("Confetti trigger error:", error);
      });
    }
    triggerRef.current = Boolean(trigger);
  }, [trigger, runBurst]);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.disabled) {
      props.onClick?.(event);
      return;
    }
    if (!fireOnClick) {
      props.onClick?.(event);
      return;
    }
    try {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      await runBurst({
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      });
    } catch (error) {
      console.error("Confetti button error:", error);
    }
    props.onClick?.(event);
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};

ConfettiButtonComponent.displayName = "ConfettiButton";

export const ConfettiButton = ConfettiButtonComponent;
