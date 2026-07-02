import type { SVGProps } from "react";

export function ChevronLeft({
  filled: _filled,
  ...props
}: SVGProps<SVGSVGElement> & { filled?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
      {...props}
    >
      <path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z" />
    </svg>
  );
}
