export const theme = {
  colors: {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    secondary: '#64748b',
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
    bgColor: '#0f172a',
    bgLight: '#1e293b',
    textColor: '#f1f5f9',
    textMuted: '#94a3b8',
  },
  borderRadius: '12px',
  shadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  transitions: {
    default: 'all 0.3s ease',
  },
};

export type Theme = typeof theme;
