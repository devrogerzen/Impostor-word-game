import Swal from 'sweetalert2';

// Custom SweetAlert configuration with game theme
const customSwal = Swal.mixin({
  customClass: {
    popup: 'impostor-swal-popup',
    title: 'impostor-swal-title',
    htmlContainer: 'impostor-swal-text',
    confirmButton: 'impostor-swal-confirm',
    cancelButton: 'impostor-swal-cancel',
  },
  buttonsStyling: false,
});

// Inject custom styles
const style = document.createElement('style');
style.innerHTML = `
  .impostor-swal-popup {
    background: #1B263B !important;
    border: 3px solid #FF6B35 !important;
    border-radius: 16px !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 107, 53, 0.3) !important;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  }

  .impostor-swal-title {
    color: #FFFFFF !important;
    font-size: 1.8rem !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
    letter-spacing: 2px !important;
    text-shadow: 3px 3px 0 #E55528 !important;
  }

  .impostor-swal-text {
    color: #E0E1DD !important;
    font-size: 1.1rem !important;
    line-height: 1.6 !important;
  }

  .impostor-swal-confirm,
  .impostor-swal-cancel {
    padding: 12px 30px !important;
    font-size: 1rem !important;
    font-weight: bold !important;
    border-radius: 8px !important;
    border: none !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    margin: 5px !important;
  }

  .impostor-swal-confirm {
    background: #FF6B35 !important;
    color: white !important;
    box-shadow: 0 4px 0 #E55528 !important;
  }

  .impostor-swal-confirm:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 8px 0 #E55528, 0 12px 24px rgba(255, 107, 53, 0.3) !important;
  }

  .impostor-swal-confirm:active {
    transform: translateY(2px) !important;
    box-shadow: 0 2px 0 #E55528 !important;
  }

  .impostor-swal-cancel {
    background: #004E89 !important;
    color: white !important;
    box-shadow: 0 4px 0 #003A66 !important;
  }

  .impostor-swal-cancel:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 8px 0 #003A66, 0 12px 24px rgba(0, 78, 137, 0.3) !important;
  }

  .impostor-swal-cancel:active {
    transform: translateY(2px) !important;
    box-shadow: 0 2px 0 #003A66 !important;
  }

  .swal2-icon {
    border-color: #FF6B35 !important;
    color: #FF6B35 !important;
  }

  .swal2-icon.swal2-success [class^='swal2-success-line'] {
    background-color: #06D6A0 !important;
  }

  .swal2-icon.swal2-success .swal2-success-ring {
    border-color: #06D6A0 !important;
  }

  .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {
    background-color: #EF476F !important;
  }

  .swal2-icon.swal2-warning {
    border-color: #F7B801 !important;
    color: #F7B801 !important;
  }

  .swal2-icon.swal2-info {
    border-color: #004E89 !important;
    color: #004E89 !important;
  }
`;
document.head.appendChild(style);

// Utility functions for common alert types
export const showAlert = {
  error: (message: string, title: string = '¡Error!') => {
    return customSwal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonText: 'Entendido',
    });
  },

  success: (message: string, title: string = '¡Éxito!') => {
    return customSwal.fire({
      icon: 'success',
      title,
      text: message,
      confirmButtonText: 'Genial',
      timer: 2000,
      timerProgressBar: true,
    });
  },

  warning: (message: string, title: string = '¡Advertencia!') => {
    return customSwal.fire({
      icon: 'warning',
      title,
      text: message,
      confirmButtonText: 'Entendido',
    });
  },

  info: (message: string, title: string = 'Información') => {
    return customSwal.fire({
      icon: 'info',
      title,
      text: message,
      confirmButtonText: 'OK',
    });
  },

  confirm: async (message: string, title: string = '¿Estás seguro?') => {
    const result = await customSwal.fire({
      icon: 'question',
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });
    return result.isConfirmed;
  },

  simple: (message: string) => {
    return customSwal.fire({
      text: message,
      confirmButtonText: 'OK',
    });
  },
};

export default customSwal;
