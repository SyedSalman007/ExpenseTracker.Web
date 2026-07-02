import type { SVGProps } from "react";

export function ExpandMore({
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
      <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z" />
    </svg>
  );
}
