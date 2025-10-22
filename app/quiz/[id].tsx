import NavigationButtons from '@/components/NavigationButtons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Timer from '@/components/Timer';
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
  const { incrementScore, addUserAnswer } = useStore((state) => ({
    incrementScore: state.incrementScore,
    addUserAnswer: state.addUserAnswer,
  }));
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds for each question
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const answer = selectedOption ?? 'UNANSWERED';
    addUserAnswer(answer);

    // check correctness and increment score if needed
    // questions data uses `answer` as the correct answer string
    if (selectedOption && question?.answer && selectedOption === question.answer) {
      incrementScore();
    }

    // navigate to next question or results screen
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeLeft(30); // reset when question changes
  }, [questionIndex]);

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
      <Timer duration={timeLeft} onTimeUp={handleNextQuestion} />
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
    backgroundColor: '#d3f9d8',
  },
});