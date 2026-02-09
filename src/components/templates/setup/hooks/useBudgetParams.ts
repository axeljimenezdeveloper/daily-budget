import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export const useBudgetParams = () => {
  const params = useLocalSearchParams();

  return React.useMemo(() => {
    const budget = params.budget as string || '';
    return {
      budget,
      numericBudget: budget ? parseFloat(budget) : 0,
    };
  }, [params]);
};