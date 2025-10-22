import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type QuestionCardProps = {
  question: string;
  options: string[];
};

const QuestionCard = ({ question, options }: QuestionCardProps) => {
  return (
    <ThemedView style={styles.card}>
      <ThemedText>{question}</ThemedText>
      {options.map((option, index) => (
        <View key={index} style={styles.option}>
          <ThemedText>{option}</ThemedText>
        </View>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
  },
});

export default QuestionCard;