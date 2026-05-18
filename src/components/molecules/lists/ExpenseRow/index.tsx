// ============================================================================
// COMPONENTE MOLECULAR: ExpenseRow
//
// Representa una fila individual en la lista de gastos del historial.
// - Muestra la categoría como texto principal.
// - La nota se trunca a 2 líneas con puntos suspensivos.
// - El monto formateado se muestra a la derecha, dentro del área presionable.
// - El botón de eliminar es independiente (no abre el modal de detalle).
// - Al presionar cualquier otra área de la fila se ejecuta onDetailPress.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from 'react';

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS
// ----------------------------------------------------------------------------
import AppPressable from '@/components/atoms/action/AppPressable';
import AppIcon from '@/components/atoms/content/AppIcon';
import AppBox from '@/components/atoms/structure/AppBox';
import AppText from '@/components/atoms/content/AppText';

// ----------------------------------------------------------------------------
// UTILIDADES
// ----------------------------------------------------------------------------
import { formatMoney } from '@/store/useVaultStore/index.utils';
import { SPACING } from '@/constants/metrics';

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
  onDetailPress,
}) => {
  // --------------------------------------------------------------------------
  // MANEJADOR DE ELIMINACIÓN (con throttling y haptic por AppPressable)
  // --------------------------------------------------------------------------
  const handleDelete = () => {
    onDelete(transaction.id);
  };

  // --------------------------------------------------------------------------
  // MANEJADOR DE DETALLE (solo si se proporcionó el callback)
  // --------------------------------------------------------------------------
  const handleDetail = () => {
    if (onDetailPress) {
      onDetailPress(transaction);
    }
  };

  // --------------------------------------------------------------------------
  // RENDER: Estructura con área presionable para detalle + botón eliminar aparte
  // --------------------------------------------------------------------------
  return (
    <AppBox
      direction="row"
      align="center"
      gap="m"
      padding="m"
      style={{ width: '100%' }}
    >
      {/* --------------------------------------------------------------------
        ÁREA PRINCIPAL PRESIONABLE (categoría, nota truncada, monto)
        -------------------------------------------------------------------- */}
      <AppPressable
        onPress={handleDetail}
        style={{ flex: 1 }}
        hapticFeedback="light"
        throttleMs={300}
      >
        <AppBox direction="row" align="center" gap="m" style={{ flex: 1 }}>
          {/* Ícono de categoría */}
          <AppIcon name="cash-outline" color="secondary" size="m" />

          {/* Textos: categoría y nota (truncada a 2 líneas) */}
          <AppBox flex={1} gap="xs">
            <AppText variant="body" color="primary">
              {transaction.category}
            </AppText>
            {transaction.note && (
              <AppText
                variant="caption"
                color="secondary"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {transaction.note}
              </AppText>
            )}
          </AppBox>

          {/* Monto formateado (dentro del área presionable) */}
          <AppText variant="body" color="primary">
            {formatMoney(transaction.amount, currency)}
          </AppText>
        </AppBox>
      </AppPressable>

      {/* --------------------------------------------------------------------
        BOTÓN DE ELIMINAR (independiente, no abre el modal de detalle)
        -------------------------------------------------------------------- */}
      <AppPressable
        onPress={handleDelete}
        hapticFeedback="light"
        throttleMs={300}
      >
        <AppIcon name="trash-outline" color="error" size="m" />
      </AppPressable>
    </AppBox>
  );
};