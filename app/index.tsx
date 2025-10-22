import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

const CATEGORIES = ["Tech Trivia"];

export default function Index() {
  return (
    <ScrollView style={styles.container}> 
      <ThemedText type='subtitle'>Welcome to the Tech Trivia Quiz!</ThemedText>
      <ThemedText>Choose a category to start:</ThemedText>
      {CATEGORIES.map((category) => (
        <ThemedView key={category} style={styles.categoryWrapper}>
          <Link href={`/quiz`} style={styles.category} asChild>  
            <ThemedText>{category}</ThemedText>
          </Link>
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
    backgroundColor: '#f0f0f0ff',
    padding: 15,
    alignItems: 'center',
  },
});