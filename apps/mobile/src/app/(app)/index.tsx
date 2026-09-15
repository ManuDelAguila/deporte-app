import { useEffect, useState } from 'react';
import { AppState, Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import StepsCard from '@/components/StepsCard';
import { getTodaySteps } from '@/services/steps/getTodaySteps';

import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {

  const { signOut } = useAuth();

  const [steps, setSteps] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {

      const loadTodaySteps = async () => {
        setError(null);
        
        const todaySteps = await getTodaySteps();

        setSteps(todaySteps);

      };

      const handleLoadError = (error: unknown) => {
        console.warn('No se pudieron leer los pasos:', error);

        if (error instanceof Error) {
          setError(error.message);
          return;
        }

        setError('No se pudieron cargar los pasos.');
      };

      loadTodaySteps().catch(handleLoadError);

      const appStateSubscription = AppState.addEventListener(
        'change',
        nextAppState => {
          if (nextAppState === 'active') {
            console.log('La app ha vuelto a primer plano, recargando pasos...');
            loadTodaySteps().catch(handleLoadError);
          }
        }
      );

      return () => {
        appStateSubscription.remove();
      };
    }, []);
    
  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <Text style={styles.message}>{error}</Text>
      ) : steps === null ? (
        <Text style={styles.message}>Cargando pasos...</Text>
      ) : (
        <StepsCard steps={steps} goal={10000} />
      )}
      <Button title="Cerrar sesión" onPress={signOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  message: {
    flex: 1,
    padding: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});