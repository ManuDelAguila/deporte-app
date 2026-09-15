import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/AuthContext';

export default function SignInScreen() {
  const { signIn } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <Text style={styles.description}>
        Accede para consultar tu actividad.
      </Text>

      <Button
        title="Entrar"
        onPress={signIn}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
  },

  description: {
    fontSize: 16,
  },
});