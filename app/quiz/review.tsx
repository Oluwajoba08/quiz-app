import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import useStore from '@/stores/useStore';
import { questions } from '@/utils/data';
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet } from 'react-native';

export default function ReviewScreen() {
  const { userAnswers } = useStore();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type='title'>Review Your Answers</ThemedText>
      <ScrollView>
        {questions.map((question, index) => (
          <ThemedView lightColor='#dadadaff' darkColor='#252525ff' key={index} style={styles.questionContainer}>
            <ThemedText type='subtitle' style={styles.question}>
              {question.question}
            </ThemedText>
            <ThemedText type='defaultSemiBold'>
              Your Answer
            </ThemedText>
            <ThemedText style={{ marginBottom: 5 }}>
              {userAnswers[index]}
              <Ionicons
                name={question.answer === userAnswers[index] ? 'checkmark-circle' : 'close-circle'}
                size={16}
                color={question.answer === userAnswers[index] ? 'green' : 'red'}
              />
            </ThemedText>
            <ThemedText type='defaultSemiBold'>
              Correct Answer
            </ThemedText>
            <ThemedText>
              {question.answer}
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
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  question: {
    // fontWeight: 'bold',
    marginBottom: 15,
  }
});