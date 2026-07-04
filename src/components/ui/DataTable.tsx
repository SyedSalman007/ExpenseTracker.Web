import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  emptyMessage?: string;
}

const ALIGN_CLASSES = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
} as const;

export function DataTable<T>({ columns, data, getRowKey, emptyMessage = "No records found." }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-outline-variant bg-surface-container-low/50">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-lg py-md text-xs font-semibold uppercase tracking-wider text-outline",
                  ALIGN_CLASSES[column.align ?? "left"],
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/30">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-lg py-xl text-center text-sm text-on-surface-variant">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={getRowKey(row)} className="group transition-colors hover:bg-surface-container-low">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "px-lg py-md text-sm text-on-surface",
                      ALIGN_CLASSES[column.align ?? "left"],
                      column.className,
                    )}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
