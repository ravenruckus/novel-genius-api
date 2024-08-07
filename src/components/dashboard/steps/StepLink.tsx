import Link from 'next/link';
export default function StepLink({
  stepName,
  novelId,
  stepAction,
}: {
  novelId: string;
  stepName: string;
  stepAction: string;
}) {
  return (
    <Link
      className="text-md font-semibold leading-6 text-gray-900"
      href={`/dashboard/step-${stepName}/${novelId}`}
    >
      {stepAction} <span aria-hidden="true">→</span>
    </Link>
  );
}
