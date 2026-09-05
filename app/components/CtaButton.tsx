import { projectFormUrl } from '../../lib/site';

/** Every "Start a Project" affordance opens the inquiry form. */
export default function CtaButton({
  children = 'Start a Project',
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={projectFormUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
