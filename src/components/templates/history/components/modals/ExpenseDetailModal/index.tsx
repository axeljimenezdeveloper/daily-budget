// ============================================================================
// MODAL DE DETALLE DE GASTO - ExpenseDetailModal (CORREGIDO CON KEY)
// ============================================================================

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import AppModal from '@/components/atoms/structure/AppModal';
import AppBox from '@/components/atoms/structure/AppBox';
import AppText from '@/components/atoms/content/AppText';
import AppIcon from '@/components/atoms/content/AppIcon';
import AppDivider from '@/components/atoms/structure/AppDivider';

import { SPACING } from '@/constants/metrics';
import { formatMoney } from '@/store/useVaultStore/index.utils';
import { ExpenseDetailModalProps } from './index.props';

export const ExpenseDetailModal: React.FC<ExpenseDetailModalProps> = ({
  isOpen,
  onClose,
  transaction,
  currency,
}) => {
  const { t, i18n } = useTranslation();

  const formattedDate = useMemo(() => {
    if (!transaction) return '';
    const date = new Date(transaction.date);
    return date.toLocaleDateString(i18n.language, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [transaction, i18n.language]);

  if (!transaction) return null;

  return (
    <AppModal
      key={transaction.id} // 🔑 Clave: fuerza reinicio del modal cuando cambia la transacción
      isOpen={isOpen}
      onClose={onClose}
      title={t('expenseDetail.title')}
      showCloseButton
      closeOnBackdropPress
      height="auto"
    >
      <AppBox gap="l" style={styles.container}>
        {/* Categoría */}
        <AppBox direction="row" align="center" gap="m">
          <AppIcon name="cash-outline" color="accent" size="l" />
          <AppBox flex={1}>
            <AppText variant="caption" color="secondary">
              {t('expenseDetail.category')}
            </AppText>
            <AppText variant="body" color="primary">
              {transaction.category}
            </AppText>
          </AppBox>
        </AppBox>

        <AppDivider color="darkBorder" thickness={1} marginVertical="xs" />

        {/* Monto */}
        <AppBox direction="row" align="center" gap="m">
          <AppIcon name="cash-outline" color="accent" size="l" />
          <AppBox flex={1}>
            <AppText variant="caption" color="secondary">
              {t('expenseDetail.amount')}
            </AppText>
            <AppText variant="body" color="primary">
              {formatMoney(transaction.amount, currency)}
            </AppText>
          </AppBox>
        </AppBox>

        <AppDivider color="darkBorder" thickness={1} marginVertical="xs" />

        {/* Fecha */}
        <AppBox direction="row" align="center" gap="m">
          <AppIcon name="calendar-outline" color="accent" size="l" />
          <AppBox flex={1}>
            <AppText variant="caption" color="secondary">
              {t('expenseDetail.date')}
            </AppText>
            <AppText variant="body" color="primary">
              {formattedDate}
            </AppText>
          </AppBox>
        </AppBox>

        {/* Nota (solo si existe) */}
        {transaction.note && (
          <>
            <AppDivider color="darkBorder" thickness={1} marginVertical="xs" />
            <AppBox direction="row" align="flex-start" gap="m">
              <AppIcon name="create-outline" color="accent" size="l" />
              <AppBox flex={1}>
                <AppText variant="caption" color="secondary">
                  {t('expenseDetail.note')}
                </AppText>
                <AppText variant="body" color="primary" style={styles.noteText}>
                  {transaction.note}
                </AppText>
              </AppBox>
            </AppBox>
          </>
        )}
      </AppBox>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.s,
  },
  noteText: {
    lineHeight: 20,
  },
});