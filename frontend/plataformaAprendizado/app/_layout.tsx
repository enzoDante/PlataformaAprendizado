import { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { getAccessToken } from '@/services/authService';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function verifyAuth() {
      try {
        const token = await getAccessToken();

        
        const isAuthScreen = segments[0] === '(auth)';

        if (!token) {
          
          if (!isAuthScreen) {
            
            router.replace('/login');
          }
        } else {
          
          if (isAuthScreen) {
            router.replace('/');
          }
        }
      } catch (error) {
        console.error("Erro na validação de rotas:", error);
      } finally {
        setIsReady(true);
      }
    }

    verifyAuth();
  }, [segments]);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Rotas de Autenticação */}
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />

        {/* Abas Principais */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Telas dos Mundos (Mapeadas individualmente já que não há layout global nelas) */}
        <Stack.Screen name="(worlds)/cWorld" options={{ headerShown: false }} />
        <Stack.Screen name="(worlds)/javaWorld" options={{ headerShown: false }} />
        <Stack.Screen name="(worlds)/logicWorld" options={{ headerShown: false }} />
        <Stack.Screen name="(worlds)/pythonWorld" options={{ headerShown: false }} />
        
        {/* Telas Dinâmicas de Cursos */}
        <Stack.Screen name="course/[id]" options={{ headerShown: false }} />
        
        {/* Utilitários */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="admin" options={{ title: 'Painel Admin' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}