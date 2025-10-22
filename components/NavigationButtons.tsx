import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';
// import useStore from '@/stores/useStore';

type NavigationProps = {
  currentQuestionIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled?: boolean;
};

const NavigationButtons = ({ currentQuestionIndex, totalQuestions, isNextDisabled, onNext, onPrevious }: NavigationProps) => {

  const handleNext = () => {
    if (isNextDisabled) return;
    onNext();
  };

  return (
    <View style={styles.container}>
      <Pressable 
        style={[styles.button, currentQuestionIndex === 0 && styles.disabled]} 
        onPress={onPrevious} 
        disabled={currentQuestionIndex === 0}
      >
        <ThemedText>Previous</ThemedText>
      </Pressable>
      <Pressable 
        style={[styles.button, currentQuestionIndex === totalQuestions - 1 && styles.disabled]} 
        onPress={handleNext} 
        disabled={currentQuestionIndex === totalQuestions - 1}
      >
        <ThemedText>Next</ThemedText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  disabled: {
    backgroundColor: '#A9A9A9',
  },
});

export default NavigationButtons;