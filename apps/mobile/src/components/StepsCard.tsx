import { StyleSheet, Text, View } from 'react-native';

type StepsCardProps = {
  steps: number;
  goal: number;
};

export default function StepsCard({ steps, goal }: StepsCardProps) {
    const progress = goal > 0
        ? Math.min(steps / goal, 1)
        : 0;
    const motivation =
        steps >= goal
            ? '¡Objetivo conseguido! 🎉'
            : progress >= 0.5
            ? '¡Ya llevas más de la mitad! 💪'
            : '¡Sigue adelante! 🚶';

    return (
        <View style={styles.content}>
            <Text style={styles.greeting}>¡Hola! 👋</Text>

            <Text style={styles.subtitle}>
                Tu actividad de hoy
            </Text>

            <View style={styles.stepsCard}>
                <Text style={styles.steps}>{steps.toLocaleString()}</Text>
                <Text style={styles.stepsLabel}>pasos</Text>

                <View style={styles.progressBackground}>
                <View
                    style={[
                    styles.progress,
                    { width: `${progress * 100}%` },
                    ]}
                />
                </View>

                <Text style={styles.goal}>
                Objetivo: {goal.toLocaleString()} pasos
                </Text>
            </View>

            <Text style={styles.motivation}>
                {motivation}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 32,
  },

  stepsCard: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#eeeeee',
  },

  steps: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  stepsLabel: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },

  progressBackground: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#cccccc',
    overflow: 'hidden',
  },

  progress: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#333333',
  },

  goal: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 14,
  },

  motivation: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});