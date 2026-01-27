// Base metrics definition
export const TYPOGRAPHY = {
  // Títulos de alto impacto (Hero, Pantallas de bienvenida)
  hero: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
    fontWeight: '700' as const,
  },
  // Títulos principales de pantallas
  title: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.3,
    fontWeight: '700' as const,
  },
  // Subtítulos o nombres de secciones
  header: {
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.3,
    fontWeight: '600' as const,
  },
  // Títulos de tarjetas o elementos destacados
  subheader: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.2,
    fontWeight: '600' as const,
  },
  // Texto de lectura principal
  bodyLg: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '400' as const,
  },
  // Texto estándar
  bodyMd: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: '400' as const,
  },
  // Texto secundario o detalles
  bodySm: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
    fontWeight: '400' as const,
  },
  // Etiquetas muy pequeñas
  label: {
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.2,
    fontWeight: '400' as const,
  },
};

// Spacing system (Standard 4px base for mobile)
export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  xxxxl: 80,
};

// Size system - Extiende SPACING y agrega tamaños específicos si son necesarios
export const SIZES = {
  ...SPACING, // Hereda todos los valores de SPACING
  // Tamaños adicionales específicos si se necesitan
  '3xs': 2,    // Tamaño extra pequeño
  '2xs': 3,    // Un poco más pequeño que xs
  '4xl': 96,   // Tamaño extra grande
  '5xl': 128,  // Tamaño muy grande
  '6xl': 160,  // Tamaño enorme
};

// Border radius (For cards and buttons)
export const BORDER_RADIUS = {
  s: 4,
  m: 8,
  l: 12,
  xl: 20,
  round: 999, // For fully rounded buttons
};

// Screen dimensions (Useful for responsive styles)
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const WINDOW = {
  width,
  height,
};

// Helper type para TypeScript
export type SizeKey = keyof typeof SIZES;
export type SpacingKey = keyof typeof SPACING;