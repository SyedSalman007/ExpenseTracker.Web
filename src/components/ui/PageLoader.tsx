import { Spinner } from "@/components/ui/Spinner";

export function PageLoader() {
  return (
    <div className="flex h-full min-h-[60vh] w-full items-center justify-center text-primary">
      <Spinner size="lg" />
    </div>
  );
}
