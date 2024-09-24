import { cn } from '@/lib/utils';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { Button } from '@/components/Button';

interface IStepperContextProps {
  previousStep: () => void;
  nextStep: () => void;
}

export const StepperContext = createContext({} as IStepperContextProps);

interface IStepperProps {
  initialStep?: number;
  steps: {
    label: string;
    content: React.ReactNode;
  }[];
}

export function Stepper({ steps, initialStep = 0 }: IStepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
  }, [steps]);

  return (
    <StepperContext.Provider value={{ previousStep, nextStep }}>
      <div>
        <ul className="space-x-4">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className={cn(
                'inline-block text-xs px-2 py-1 rounded-md',
                index === currentStep && 'bg-primary text-primary-foreground'
              )}
            >
              {String(index + 1).padStart(2, '0')}. {step.label}
            </li>
          ))}
        </ul>

        <div className="mt-10 ">{steps[currentStep].content}</div>
      </div>
    </StepperContext.Provider>
  );
}

export function StepperFooter({ children }: { children: React.ReactNode }) {
  return <footer className="mt-6 flex justify-end gap-2">{children}</footer>;
}

export function StepperPreviousButton({
  size = 'sm',
  type = 'button',
  variant = 'secondary',
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { previousStep } = useContext(StepperContext);

  return (
    <Button
      type={type}
      size={size}
      variant={variant}
      onClick={onClick ??  previousStep}
      {...props}
    >
      Anterior
    </Button>
  );
}

export function StepperNextButton({
  size = 'sm',
  type = 'button',
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { nextStep } = useContext(StepperContext);

  return (
    <Button
      type={type}
      size={size}
      onClick={onClick ?? nextStep}
      {...props}
    >
      Próximo
    </Button>
  );
}
