// ============================================================================
// COMPONENTE MOLECULAR: ExpenseRow
//
// Representa una fila individual en la lista de gastos del historial.
// Muestra la categoría del gasto como texto principal, la nota (si existe)
// como subtítulo, el monto formateado y un ícono de eliminar que ejecuta
// el callback onDelete con el ID de la transacción.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from 'react';

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS
// ----------------------------------------------------------------------------
import AppListItem from '@/components/atoms/action/AppListItem';
import AppPressable from '@/components/atoms/action/AppPressable';
import AppIcon from '@/components/atoms/content/AppIcon';
import AppBox from '@/components/atoms/structure/AppBox';
import AppText from '@/components/atoms/content/AppText';

// ----------------------------------------------------------------------------
// UTILIDADES
// ----------------------------------------------------------------------------
import { formatMoney } from '@/store/useVaultStore/index.utils';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------
import { ExpenseRowProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
export const ExpenseRow: React.FC<ExpenseRowProps> = ({
  transaction,
  currency,
  onDelete,
}) => {
  // --------------------------------------------------------------------------
  // MANEJADOR DE ELIMINACIÓN (con throttling y haptic por AppPressable)
  // --------------------------------------------------------------------------
  const handleDelete = () => {
    onDelete(transaction.id);
  };

  // --------------------------------------------------------------------------
  // CONTENIDO DERECHO: monto formateado + ícono de eliminar
  // --------------------------------------------------------------------------
  const rightContent = (
    <AppBox direction="row" align="center" gap="m">
      {/* Monto formateado */}
      <AppText variant="body" color="primary">
        {formatMoney(transaction.amount, currency)}
      </AppText>

      {/* Botón de eliminar con feedback táctil */}
      <AppPressable
        onPress={handleDelete}
        hapticFeedback="light"
        throttleMs={300}
      >
        <AppIcon name="trash-outline" color="error" size="m" />
      </AppPressable>
    </AppBox>
  );

  // --------------------------------------------------------------------------
  // RENDER: AppListItem sin onPress (solo informativo), con ícono de categoría
  // y el contenido derecho personalizado.
  // --------------------------------------------------------------------------
  return (
    <AppListItem
      label={transaction.category}
      subLabel={transaction.note}
      icon="cash-outline"
      iconColor="secondary"
      rightContent={rightContent}
    />
  );
};