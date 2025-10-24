import NavigationButtons from '@/components/NavigationButtons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import useStore from '@/stores/useStore';
import { questions } from '@/utils/data';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function QuestionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const rawId = id ?? '0';
  const questionIndex = Number(rawId);
  if (Number.isNaN(questionIndex)) {
    // handle invalid id (redirect or show error)
    router.replace('/'); // example
    return null;    
  }
  const incrementScore = useStore((state) => state.incrementScore);
  const addUserAnswer = useStore((state) => state.addUserAnswer);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [questionIndex]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const answer = selectedOption ?? 'UNANSWERED';
    addUserAnswer(answer);

    if (selectedOption && question?.answer && selectedOption === question.answer) {
      incrementScore();
    }

    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length) {
      router.push(`/quiz/${nextIndex}`);
    } else {
      router.push('/quiz/results');
    }
  };

  const handlePreviousQuestion = () => {
    router.push(`/quiz/${questionIndex - 1}`);
  };

  const question = questions[questionIndex];
   // guard for out-of-range index
  if (!question) {
    router.replace('/');
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{question.question}</ThemedText>
      {question.options.map((option, index) => (
        <Pressable
          key={index}
          onPress={() => handleOptionSelect(option)}
          style={[
            styles.option,
            selectedOption === option && styles.selectedOption,
          ]}
        >
          <ThemedText>{option}</ThemedText>
        </Pressable>
      ))}
      <NavigationButtons
        currentQuestionIndex={questionIndex}
        totalQuestions={questions.length}
        onNext={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
        isNextDisabled={!selectedOption}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedOption: {
    borderColor: '#275ccfff',
    borderWidth: 2,
  },
});