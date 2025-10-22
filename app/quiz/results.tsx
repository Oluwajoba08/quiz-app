import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import useStore from '@/stores/useStore';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function ResultsScreen() {
  const { score, totalQuestions } = useStore();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type='title'>Quiz Results</ThemedText>
      <ThemedText>Your Score: {score} / {totalQuestions}</ThemedText>
      <ThemedText onPress={() => router.push('/quiz/review')}>Review Answers</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
});