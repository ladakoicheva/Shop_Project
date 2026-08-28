import { NoFound } from '../../uix/NoFound';

export default function NoFoundPage() {
  return (
    <NoFound
      type="404"
      title="404 - Page Not Found"
      subtitle="The page you are looking for does not exist or has been moved."
      actionLabel="Return to Catalog"
      actionTo="/"
    />
  );
}
