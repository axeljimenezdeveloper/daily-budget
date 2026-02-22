// ============================================================================
// PROPS DE LA SECCIÓN DE EXPORTACIÓN (ExportSection)
//
// Define las propiedades que recibe el componente ExportSection para mostrar
// las opciones de exportación de datos: exportación a CSV plano, exportación
// de backup cifrado con protección biométrica e importación de backup cifrado.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ DE PROPS - ExportSectionProps
// ----------------------------------------------------------------------------

/**
 * Props del componente ExportSection.
 *
 * @property isExporting       - Indica si actualmente se está generando el archivo CSV.
 *                               Cuando es true, se muestra un spinner en el botón CSV y se deshabilita.
 * @property onExport          - Callback que se ejecuta al presionar el botón de exportar CSV.
 *
 * @property isBackupExporting - Indica si actualmente se está generando el backup cifrado.
 *                               Cuando es true, se muestra un spinner en el botón de backup y se deshabilita.
 * @property onBackupExport    - Callback que se ejecuta al presionar el botón de exportar backup cifrado.
 *
 * @property isImporting       - Indica si actualmente se está importando un backup.
 *                               Cuando es true, se muestra un spinner en el botón de importar y se deshabilita.
 * @property onImport          - Callback que se ejecuta al presionar el botón de importar backup.
 */
export interface ExportSectionProps {
  isExporting: boolean;
  onExport: () => void;
  isBackupExporting: boolean;
  onBackupExport: () => void;
  isImporting: boolean;
  onImport: () => void;
}