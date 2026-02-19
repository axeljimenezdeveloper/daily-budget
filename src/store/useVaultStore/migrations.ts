// ============================================================================
// MIGRACIONES DEL STORE - useVaultStore
//
// Cada función recibe el estado actual (merged entre estado inicial y datos
// persistidos) y retorna el estado transformado para la siguiente versión.
// ============================================================================

// ----------------------------------------------------------------------------
// MIGRACIONES POR VERSIÓN (índice 0 → versión 0->1, índice 1 → 1->2, etc.)
// ----------------------------------------------------------------------------
export const migrations: Array<(state: any) => any> = [
  // Versión 0 -> 1 (primera versión con control de versiones)
  (state) => ({
    ...state,
    _storeVersion: 1,
    // En futuras migraciones se pueden añadir transformaciones de datos aquí
  }),
];