import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App } from '@capacitor/app';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

/**
 * Hook para manejar features nativas de Capacitor
 * Solo ejecuta código nativo cuando la app está en un dispositivo móvil
 */
export const useNativeFeatures = () => {
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    if (!isNative) return;

    // Configurar Status Bar
    const setupStatusBar = async () => {
      try {
        await StatusBar.setBackgroundColor({ color: '#FF6B35' });
        await StatusBar.setStyle({ style: Style.Dark });
      } catch (error) {
        console.error('Error configurando StatusBar:', error);
      }
    };

    // Ocultar Splash Screen
    const hideSplash = async () => {
      try {
        await SplashScreen.hide();
      } catch (error) {
        console.error('Error ocultando SplashScreen:', error);
      }
    };

    // Listener para cuando la app pasa a background/foreground
    let cleanupListener: (() => void) | undefined;

    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        console.log('App volvió a foreground');
      } else {
        console.log('App pasó a background');
      }
    }).then((listener) => {
      cleanupListener = () => listener.remove();
    });

    // Inicializar configuraciones
    setupStatusBar();
    hideSplash();

    // Cleanup
    return () => {
      if (cleanupListener) {
        cleanupListener();
      }
    };
  }, [isNative]);

  // Función helper para vibración en botones
  const vibrate = async (style: ImpactStyle = ImpactStyle.Medium) => {
    if (!isNative) return;

    try {
      await Haptics.impact({ style });
    } catch (error) {
      console.error('Error en vibración:', error);
    }
  };

  return {
    isNative,
    vibrate,
    platform: Capacitor.getPlatform() // 'web', 'android', 'ios'
  };
};
