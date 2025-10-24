import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import useStore from '@/stores/useStore';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const CATEGORIES = ["Tech Quiz"];

export default function Index() {
  const router = useRouter();
  const startQuiz = useStore((s) => s.resetQuiz);

  const onStart = () => {
    startQuiz();
    router.push('/quiz/0');
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText type='subtitle'>Welcome to the Tech Quiz!</ThemedText>
      <ThemedText>Choose a category to start:</ThemedText>
      {CATEGORIES.map((category) => (
        <ThemedView key={category} style={styles.categoryWrapper}>
          <TouchableOpacity style={styles.category} onPress={onStart}>
            <ThemedText>{category}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  categoryWrapper: {
    marginVertical: 10,
  },
  category: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
});