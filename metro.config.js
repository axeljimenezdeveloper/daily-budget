// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Habilita explícitamente el soporte para "exports" en package.json
// (necesario para que Metro resuelva correctamente @noble/ciphers/aes.js)
config.resolver.unstable_enablePackageExports = true;

// Asegura que las extensiones .js y .mjs sean reconocidas
config.resolver.sourceExts.push('mjs');

// (Opcional) Si tienes problemas con symlinks, puedes agregar:
// config.resolver.extraNodeModules = {
//   '@noble/ciphers': require('path').resolve(__dirname, 'node_modules/@noble/ciphers')
// };

module.exports = config;