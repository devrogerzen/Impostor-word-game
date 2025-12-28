export const theme = {
  colors: {
    // Paleta vibrante y jugosa
    primary: '#FF6B35',      // Naranja energético
    primaryDark: '#E55528',  // Naranja oscuro
    secondary: '#004E89',    // Azul profundo
    accent: '#F7B801',       // Amarillo dorado
    success: '#06D6A0',      // Verde menta
    danger: '#EF476F',       // Rosa fuerte
    warning: '#FFD23F',      // Amarillo brillante
    purple: '#7209B7',       // Púrpura vibrante

    // Fondos
    bgDark: '#0D1B2A',       // Azul muy oscuro
    bgMedium: '#1B263B',     // Azul medio oscuro
    bgLight: '#415A77',      // Azul gris
    bgCard: '#1B263B',       // Fondo de tarjetas

    // Textos
    textColor: '#FFFFFF',
    textMuted: '#E0E1DD',
    textDark: '#0D1B2A',
  },
  borderRadius: '16px',
  borderRadiusLg: '24px',
  borderRadiusSm: '8px',
  shadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
  shadowLg: '0 12px 32px rgba(0, 0, 0, 0.5)',
  transitions: {
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export type Theme = typeof theme;
