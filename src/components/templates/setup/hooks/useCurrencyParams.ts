import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Currency } from '../types';
import { CURRENCY_LIST } from '../constants/currencies';

export const useCurrencyParams = (): Currency => {
  const params = useLocalSearchParams();

  return React.useMemo(() => {
    if (params.currencyJSON) {
      try {
        return JSON.parse(params.currencyJSON as string);
      } catch (e) {
        console.error("Error parsing currency JSON:", e);
      }
    }
    
    return {
      symbol: (params.currencySymbol as string) || CURRENCY_LIST[0].symbol,
      code: (params.currencyCode as string) || CURRENCY_LIST[0].code,
      name: (params.currencyName as string) || CURRENCY_LIST[0].name,
      flag: (params.currencyFlag as string) || CURRENCY_LIST[0].flag,
      locale: "en-US"
    };
  }, [params]);
};