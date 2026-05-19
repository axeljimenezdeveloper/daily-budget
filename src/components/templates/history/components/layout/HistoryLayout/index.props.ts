// ============================================================================
// PROPS DEL LAYOUT BASE DEL HISTORIAL (HistoryLayout)
//
// Define las propiedades del componente que envuelve la pantalla de historial.
// Proporciona estructura visual: fondo, padding y un contenedor que puede ser
// ScrollView (por defecto) o FlatList (para carga infinita).
// ============================================================================

import { FlatListProps } from 'react-native';
import { GroupedExpenses } from '../../../types';

export interface HistoryLayoutProps {
  /**
   * Contenido principal cuando se usa ScrollView (modo tradicional).
   * Normalmente será ExpensesList o EmptyState.
   */
  children?: React.ReactNode;

  /**
   * Elemento opcional que se renderiza al final del ScrollView.
   * Solo aplica cuando se usa children.
   */
  footer?: React.ReactNode;

  /**
   * Datos para FlatList (modo carga infinita).
   * Si se proporciona, se usa FlatList en lugar de ScrollView.
   */
  flatListData?: GroupedExpenses[];

  /**
   * Función para renderizar cada grupo en FlatList.
   * Recibe el grupo y debe retornar el JSX (usar ExpensesList con singleGroup o similar).
   */
  renderGroup?: (group: GroupedExpenses, index: number) => React.ReactElement;

  /**
   * Función para cargar más datos cuando se alcanza el final del scroll.
   */
  onEndReached?: () => void;

  /**
   * Distancia desde el final del scroll para disparar onEndReached (en px).
   * @default 100
   */
  onEndReachedThreshold?: number;

  /**
   * Indica si se están cargando más datos (para mostrar spinner al final).
   */
  isLoadingMore?: boolean;

  /**
   * Indica si existen más datos para cargar (muestra mensaje o no).
   */
  hasMore?: boolean;

  /**
   * Componente a renderizar cuando isLoadingMore es true.
   * Por defecto se muestra un AppSpinner.
   */
  loadingFooter?: React.ReactNode;

  /**
   * Componente a renderizar cuando no hay más datos.
   * Por defecto no se muestra nada.
   */
  endFooter?: React.ReactNode;
}