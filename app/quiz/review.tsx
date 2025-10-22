import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import useStore from '@/stores/useStore';
import { questions } from '@/utils/data';
import { ScrollView, StyleSheet } from 'react-native';

export default function ReviewScreen() {
  const { userAnswers } = useStore();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type='title'>Review Your Answers</ThemedText>
      <ScrollView>
        {questions.map((question, index) => (
          <ThemedView key={index} style={styles.questionContainer}>
            <ThemedText>{question.question}</ThemedText>
            <ThemedText>Your Answer: {userAnswers[index]}</ThemedText>
            <ThemedText style={{ color: question.answer === userAnswers[index] ? 'green' : 'red' }}>
              Correct Answer: {question.answer}
            </ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
});