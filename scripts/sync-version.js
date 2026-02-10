const fs = require('fs');
const path = require('path');

console.log('🔄 Sincronizando versión de la aplicación...');

const rootDir = path.resolve(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const appTsPath = path.join(rootDir, 'src/constants/app.ts');

try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const newVersion = packageJson.version;
  
  console.log(`📦 Versión en package.json: ${newVersion}`);

  let appTsContent = fs.readFileSync(appTsPath, 'utf8');
  
  const versionRegex = /VERSION: '\d+\.\d+\.\d+' as const,/;
  
  if (!versionRegex.test(appTsContent)) {
    throw new Error('No se encontró el patrón VERSION en app.ts');
  }
  
  const updatedContent = appTsContent.replace(
    versionRegex,
    `VERSION: '${newVersion}' as const,`
  );
  
  fs.writeFileSync(appTsPath, updatedContent, 'utf8');
  
  console.log(`✅ src/constants/app.ts actualizado a: ${newVersion}`);
  console.log(`📁 Archivo: ${path.relative(rootDir, appTsPath)}`);
  
} catch (error) {
  console.error('❌ Error al sincronizar versión:', error.message);
  process.exit(1);
}