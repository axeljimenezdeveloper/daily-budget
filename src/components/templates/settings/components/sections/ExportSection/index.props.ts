// ============================================================================
// PROPS DE LA SECCIÓN DE EXPORTACIÓN (ExportSection)
//
// Define las propiedades que recibe el componente ExportSection para mostrar
// el botón de exportación a CSV y su estado de carga.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - ExportSectionProps
// ----------------------------------------------------------------------------

/**
 * Props del componente ExportSection.
 *
 * @property isExporting - Indica si actualmente se está generando el archivo CSV.
 *                         Cuando es true, se muestra un spinner y se deshabilita el botón.
 * @property onExport    - Callback que se ejecuta al presionar el botón de exportar.
 */
export interface ExportSectionProps {
  isExporting: boolean;
  onExport: () => void;
}