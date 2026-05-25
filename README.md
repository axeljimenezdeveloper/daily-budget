# Daily Budget – Tu presupuesto en días

![Versión](https://img.shields.io/badge/version-1.55.0-blue)
![Plataforma](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey)
![Estado](https://img.shields.io/badge/status-production--ready-brightgreen)

**Daily Budget** transforma tu presupuesto en **días cubiertos**. En lugar de números abstractos, visualiza tu dinero como tiempo: cada gasto reduce los días que puedes cubrir. Ideal para planificar gastos esenciales y personales de forma sencilla y motivadora.

Desarrollada con **React Native (Expo SDK 54)** y **Expo Router**, sigue una arquitectura **Atomic Design** con un sistema de diseño consistente, soporte completo para internacionalización (español/inglés) y almacenamiento local cifrado.

**La aplicación está completamente funcional y lista para uso diario.**  
(Se detectarán y corregirán posibles errores menores en el tiempo, pero el MVP es sólido.)

## ✨ Características principales

- **Onboarding interactivo** – Introduce el concepto de "dinero como tiempo" en 3 pantallas con iconos dinámicos y textos destacados.
- **Configuración personalizada** – Elige moneda (USD, EUR, MXN, VES, etc.), presupuesto total y duración del plan (semanal, quincenal, mensual o personalizado hasta 365 días).
- **Dashboard visual** – Anillo de progreso interactivo (alterna entre % y monto), gráfico de gastos de los últimos 7 días con tooltips, saludo dinámico según hora del día y modo de ahorro.
- **Registro de gastos** – Modal con monto, categoría (Comida, Transporte, Ocio, Salud, Otro) y nota opcional (máx 160 caracteres). Validación en tiempo real.
- **Historial completo** – Gastos agrupados por día, carga infinita (paginación cliente-side), eliminación con confirmación, edición de gastos, modal de detalle.
- **Ajustes avanzados**:
  - Notificaciones (recordatorio diario configurable, alertas de modo ahorro y presupuesto excedido).
  - Respuesta háptica (vibración) en interacciones.
  - Cambio de idioma (español/inglés) en tiempo real.
  - Bloqueo biométrico (huella dactilar o FaceID).
  - Exportación a CSV y backups cifrados (AES-256-GCM) protegidos por biometría.
  - Zona de peligro: borrado completo de datos.
- **Drawer lateral** – Acceso rápido a Dashboard, Historial, Ajustes, Guía (FAQ) y Protocolos legales.
- **Guía integrada** – Preguntas frecuentes con acordeones animados, textos internacionalizados.
- **Protocolos legales** – Términos y condiciones organizados en acordeones (almacenamiento, privacidad, seguridad, etc.).
- **Animaciones** – Pantallas de carga, transición y éxito con redirección automática.
- **Seguridad** – Backups cifrados con AES-256-GCM, clave almacenada en SecureStore con autenticación biométrica.
- **Actualización en tiempo real** – Recalcular estado al cambiar de día o al volver a primer plano (AppState).

## 🛠️ Tecnologías utilizadas

| Categoría          | Tecnologías |
|--------------------|-------------|
| Framework          | React Native (Expo SDK 54) |
| Navegación         | Expo Router (file-based routing) |
| Estado global      | Zustand + persistencia (AsyncStorage) |
| Internacionalización | i18next + react-i18next |
| UI y estilos       | StyleSheet, tokens de diseño (colores, tipografía, espaciado) |
| Animaciones        | React Native Animated, LayoutAnimation |
| Notificaciones     | expo-notifications |
| Biometría          | expo-local-authentication + expo-secure-store |
| Cifrado            | AES-256-GCM (@noble/ciphers, expo-crypto) |
| Exportación        | expo-file-system (nueva API), expo-sharing, expo-document-picker |
| Feedback táctil    | expo-haptics |
| Fecha y hora       | @react-native-community/datetimepicker, expo-localization |
| Iconos             | @expo/vector-icons (Ionicons) |
| Gráficos           | react-native-svg |

## 📋 Requisitos previos

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- Dispositivo físico o emulador (Android/iOS) para pruebas

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio** (privado, requiere acceso)
   git clone https://github.com/tu-usuario/daily-budget.git
   cd daily-budget

2. **Instalar dependencias**
   npm install
   o
   yarn install

3. **Ejecutar en modo desarrollo**
   npx expo start
   Escanea el código QR con la app Expo Go (Android/iOS) o usa un emulador.
   Para web: npx expo start --web

4. **Construir para producción**
   eas build --platform android
   eas build --platform ios

## 🌍 Internacionalización

La app soporta **español** e **inglés**. El idioma se detecta automáticamente al inicio según el dispositivo, y el usuario puede cambiarlo desde **Ajustes > Idioma** sin reiniciar la app.

Todas las cadenas de texto están en `src/locales/en.json` y `es.json`. No hay texto duro en los componentes.

---

## 🔒 Seguridad y backups

- **Backups cifrados**: El estado completo de la app (presupuesto, transacciones, preferencias) se puede exportar a un archivo `.bkp` cifrado con **AES-256-GCM** (nonce aleatorio de 12 bytes). La clave se almacena en `expo-secure-store` con protección biométrica (`requireAuthentication: true`).
- **Importación**: Solo se puede restaurar un backup válido y autenticado biométricamente.
- **Bloqueo biométrico**: Si se activa, la app solicitará huella dactilar o FaceID al abrirse.

---

## 🔔 Notificaciones automáticas

- **Recordatorio diario** (hora configurable, por defecto 20:00). Se reprograma automáticamente al cambiar la hora o al activarse.
- **Alerta de modo ahorro**: se dispara cuando el gasto diario supera el 120% del ideal diario o el presupuesto restante es negativo. Máximo una vez por sesión (debounce 5s).
- **Alerta de presupuesto excedido**: cuando el presupuesto restante cae por debajo de 0.

Todas las notificaciones incluyen datos de navegación (`screen`, `highlight`) para abrir la pantalla correspondiente al tocarlas.

---

## 📦 Estado de la aplicación

**La aplicación se encuentra en versión estable (MVP completo).**  
Todas las funcionalidades planificadas para el lanzamiento inicial están implementadas y probadas. El código está organizado siguiendo Atomic Design y buenas prácticas de React Native/Expo.

---

## 📄 Licencia

Este proyecto es privado y su código no está disponible públicamente. Todos los derechos reservados.

---

## 📬 Contacto

Desarrollado por Axel Jiménez – axeljimenez.developer@gmail.com

---

*Daily Budget – Porque cada día cuenta.*
