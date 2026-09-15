import { Pedometer } from 'expo-sensors';

export async function getTodaySteps(): Promise<number> {
  const isAvailable = await Pedometer.isAvailableAsync();

  if (!isAvailable) {
    throw new Error(
      'El podómetro no está disponible en este dispositivo.'
    );
  }

  const permission = await Pedometer.requestPermissionsAsync();

  if (!permission.granted) {
    throw new Error(
      'Necesitamos permiso de movimiento para mostrar tus pasos.'
    );
  }

  const end = new Date();
  const start = new Date();

  start.setHours(0, 0, 0, 0);

  const result = await Pedometer.getStepCountAsync(start, end);

  return result.steps;
}