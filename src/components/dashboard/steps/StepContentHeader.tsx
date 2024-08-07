import StepLink from '@/components/dashboard/steps/StepLink';

export default function StepContentHeader({
  novelId,
  currentAction,
  nextAction,
  currentStepName,
  nextStepName,
  children,
}: any) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:py-12 lg:px-8">
        <h2 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 sm:text-4xl">
          Step {currentStepName}:
          <br />
          {currentAction}
        </h2>
        <div className="mt-8 flex items-center gap-x-6">
          {children}
          <StepLink
            stepName={nextStepName}
            novelId={novelId}
            stepAction={nextAction}
          />
        </div>
      </div>
    </div>
  );
}
