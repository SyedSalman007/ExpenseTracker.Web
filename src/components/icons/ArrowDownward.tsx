import type { SVGProps } from "react";

export function ArrowDownward({
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
      <path d="M450-800v526L202-522l-42 42 320 320 320-320-42-42-248 248v-526h-60Z" />
    </svg>
  );
}
