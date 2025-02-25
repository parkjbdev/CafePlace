// hooks/useFunnel.tsx
import React, { createContext, useContext, useState, ReactNode, memo } from 'react';

interface FunnelContextType {
  currentStep: string;
  setStep: (step: string) => void;
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

interface FunnelProps {
  children: ReactNode;
  step: string;
}

interface StepProps {
  name: string;
  children: ReactNode;
}

// 메모이제이션된 Step 컴포넌트 - 최적화를 위해 memo 사용
const StepComponent = memo(({ name, children }: StepProps) => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('Step must be used within a Funnel');
  }

  return context.currentStep === name ? <>{children}</> : null;
});

// 메모이제이션된 Funnel 컴포넌트
const FunnelComponent = memo(({ children, step }: FunnelProps) => {
  const setStepValue = React.useCallback((newStep: string) => {
    setStepFunc(newStep);
  }, []);

  // 상태를 클로저 외부에 저장하여 여러 인스턴스가 동일한 상태를 공유하도록 함
  let setStepFunc: (step: string) => void;

  return (
    <FunnelContext.Provider
      value={{
        currentStep: step,
        setStep: (newStep) => setStepValue(newStep)
      }}
    >
      {children}
    </FunnelContext.Provider>
  );
});

export function useFunnel<T extends string>(steps: T[]) {
  const [currentStep, setCurrentStep] = useState<T>(steps[0]);

  // 성능 최적화된 함수들 - useCallback으로 메모이제이션
  const nextStep = React.useCallback(() => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      return true;
    }
    return false;
  }, [currentStep, steps]);

  const prevStep = React.useCallback(() => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      return true;
    }
    return false;
  }, [currentStep, steps]);

  const isLastStep = React.useCallback(() =>
    currentStep === steps[steps.length - 1],
    [currentStep, steps]
  );

  const isFirstStep = React.useCallback(() =>
    currentStep === steps[0],
    [currentStep, steps]
  );

  const setStep = React.useCallback((step: T) => {
    setCurrentStep(step);
  }, []);

  return {
    currentStep,
    Funnel: FunnelComponent,
    Step: StepComponent,
    setStep,
    isLastStep,
    isFirstStep,
    nextStep,
    prevStep
  };
}
