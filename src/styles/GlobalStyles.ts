import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    /* Better font rendering */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;

    /* Prevent text size adjustment on iOS */
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: ${({ theme }) => theme.colors.bgDark};
    color: ${({ theme }) => theme.colors.textColor};
    min-height: 100vh;
    height: 100vh;
    overflow-x: hidden;

    /* Prevent pull-to-refresh on mobile */
    overscroll-behavior-y: contain;

    /* Better touch scrolling on iOS */
    -webkit-overflow-scrolling: touch;
  }

  #root {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px;

    @media (max-width: 768px) {
      padding: 16px;
    }

    @media (max-width: 480px) {
      padding: 12px;
    }
  }

  /* Better tap targets for accessibility */
  a, button, input, select, textarea {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  /* Prevent zoom on input focus in iOS */
  input, select, textarea {
    font-size: 16px;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;

    @media (max-width: 768px) {
      width: 6px;
    }
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bgMedium};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  /* Focus visible for accessibility */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;
