"use client";

import { useEffect, useState } from "react";
import { expenseApi } from "@/features/expenses/services/expenseApi";
import type { Expense } from "@/features/expenses/types";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    expenseApi
      .getExpenses()
      .then(setExpenses)
      .finally(() => setIsLoading(false));
  }, []);

  return { expenses, isLoading };
}
