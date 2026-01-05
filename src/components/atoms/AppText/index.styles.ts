import { TYPOGRAPHY } from "@/constants/metrics"; // Global typographic scale definitions
import { PALETTE } from "@/constants/colors"; // Global color palette for the application

// Semantic mapping of typographic styles based on the metrics system
export const TEXT_VARIANTS = {
  h1: TYPOGRAPHY.hero,      // Impact style for main screens
  h2: TYPOGRAPHY.title,     // Highlighted title for sections
  h3: TYPOGRAPHY.header,    // Header for subsections or cards
  body: TYPOGRAPHY.bodyMd,  // Standard text for paragraphs and general content
  caption: TYPOGRAPHY.bodySm,// Small informative or supporting text
  label: TYPOGRAPHY.label,   // Minimal labels for metadata or forms
};

// Semantic subset of the original palette optimized for text readability
export const TEXT_COLORS = {
  primary: PALETTE.creamWhite,    // High readability primary color for dark backgrounds
  secondary: PALETTE.lightGray,   // Color for less important text or lower hierarchy
  accent: PALETTE.sunsetOrange,  // Emphasis color to highlight keywords or actions
  success: PALETTE.successGreen, // Indicates positive states, balances, or confirmations
  error: PALETTE.errorRed,       // Used for critical alerts or negative balances
  warning: PALETTE.warningOrange,// Preventive warnings or intermediate states
  info: PALETTE.infoBlue,        // Neutral color for additional information or guides
};

// Constant for text alignment 
export const TEXT_ALIGNMENT = {
  left: 'left',       // Aligns text to the left boundary
  center: 'center',   // Centers the text within its container
  right: 'right',     // Aligns text to the right boundary
  justify: 'justify', // Stretches the lines so that each line has equal width
};

