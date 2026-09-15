import { Stack } from 'expo-router';

import {
  AuthProvider,
  useAuth,
} from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen
          name="(app)"
          options={{ headerShown: false }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen
          name="sign-in"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  );
}