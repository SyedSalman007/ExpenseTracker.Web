import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const FIELD_CLASSES =
  "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-sm text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-container";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
}

function FieldWrapper({ label, htmlFor, children }: FieldWrapperProps) {
  return (
    <div className="space-y-xs">
      <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
        {label}
      </label>
      {children}
    </div>
  );
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormInput({ label, id, className, ...props }: FormInputProps) {
  return (
    <FieldWrapper label={label} htmlFor={id!}>
      <input id={id} className={cn(FIELD_CLASSES, className)} {...props} />
    </FieldWrapper>
  );
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export function FormSelect({ label, id, options, className, ...props }: FormSelectProps) {
  return (
    <FieldWrapper label={label} htmlFor={id!}>
      <select id={id} className={cn(FIELD_CLASSES, className)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
