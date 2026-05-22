// ============================================================================
// COMPONENTE MOLECULAR: ExpenseRow
//
// Representa una fila individual en la lista de gastos del historial.
// - Muestra la categoría como texto TRADUCIDO según idioma actual.
// - Muestra el icono DINÁMICO según la categoría (comida, transporte, etc.).
// - La nota se trunca a 2 líneas con puntos suspensivos.
// - El monto formateado se muestra a la derecha, dentro del área presionable.
// - Botón de editar (lápiz) y botón de eliminar (basura), independientes.
// - Al presionar cualquier otra área de la fila se ejecuta onDetailPress.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from 'react';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS
// ----------------------------------------------------------------------------
import AppPressable from '@/components/atoms/action/AppPressable';
import AppIcon from '@/components/atoms/content/AppIcon';
import AppBox from '@/components/atoms/structure/AppBox';
import AppText from '@/components/atoms/content/AppText';

// ----------------------------------------------------------------------------
// UTILIDADES Y FEATURES
// ----------------------------------------------------------------------------
import { formatMoney } from '@/store/useVaultStore/index.utils';
import { SPACING } from '@/constants/metrics';
import { useCategoryIcon } from '@/features/categories';

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
  onEdit,
}) => {
  const { t } = useTranslation();
  const iconName = useCategoryIcon(transaction.category);

  // --------------------------------------------------------------------------
  // MANEJADORES
  // --------------------------------------------------------------------------
  const handleDelete = () => {
    onDelete(transaction.id);
  };

  const handleDetail = () => {
    onDetailPress?.(transaction);
  };

  const handleEdit = () => {
    onEdit?.(transaction);
  };

  // --------------------------------------------------------------------------
  // RENDER: Área principal presionable + botones de acción
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
          {/* Ícono dinámico según categoría */}
          <AppIcon name={iconName} color="secondary" size="m" />

          {/* Textos: categoría traducida y nota (truncada a 2 líneas) */}
          <AppBox flex={1} gap="xs">
            <AppText variant="body" color="primary">
              {t(`categories.${transaction.category}`)}
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
        BOTÓN DE EDITAR (independiente, no abre el modal de detalle)
        -------------------------------------------------------------------- */}
      {onEdit && (
        <AppPressable
          onPress={handleEdit}
          hapticFeedback="light"
          throttleMs={300}
        >
          <AppIcon name="create-outline" color="accent" size="m" />
        </AppPressable>
      )}

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