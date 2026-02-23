import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useVaultStore } from "@/store/useVaultStore";
import { generateCSV } from "@/store/useVaultStore/index.utils";

export const useExportCSV = () => {
  const { t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Exporta los datos a un archivo CSV y lo comparte.
   * @returns {Promise<{ success: boolean; error?: string }>}
   */
  const exportCSV = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (isExporting) {
      return { success: false, error: "Already exporting" };
    }

    setIsExporting(true);
    setError(null);

    // Obtener estado fresco directamente del store
    const { transactions, getSummary, currency } = useVaultStore.getState();
    const summary = getSummary();
    const csvContent = generateCSV(transactions, summary, currency);

    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, 19);
    const fileName = `vulpis_days_export_${timestamp}.csv`;

    let file: File | undefined;

    try {
      // 1. Crear archivo en caché (sandbox privado)
      file = new File(Paths.cache, fileName);
      await file.create({ overwrite: true, intermediates: true });

      // 2. Escribir contenido CSV con BOM para UTF-8
      const contentWithBOM = '\uFEFF' + csvContent;
      await file.write(contentWithBOM);

      // 3. Verificar disponibilidad de sharing
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        throw new Error(
          t("settings.export_error", { message: "Sharing not available" })
        );
      }

      // 4. Compartir archivo
      await Sharing.shareAsync(file.uri, {
        mimeType: "text/csv",
        dialogTitle: t("settings.export_csv"),
        UTI: "public.comma-separated-values-text",
      });

      // Éxito
      return { success: true };
    } catch (err) {
      console.error("[Vulpis Days] Error exporting CSV:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : t("settings.export_error", { message: "Unknown error" });
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsExporting(false);
    }
  }, [isExporting, t]);

  return { exportCSV, isExporting, error };
};