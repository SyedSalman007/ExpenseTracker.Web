"use client";

import { useEffect, useState } from "react";
import { budgetApi } from "@/features/budget/services/budgetApi";
import type { BudgetCategory, BudgetOverview } from "@/features/budget/types";

export function useBudget() {
  const [overview, setOverview] = useState<BudgetOverview | null>(null);
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([budgetApi.getOverview(), budgetApi.getCategories()])
      .then(([overviewResult, categoriesResult]) => {
        setOverview(overviewResult);
        setCategories(categoriesResult);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { overview, categories, isLoading };
}
