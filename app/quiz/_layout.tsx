import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
        <Stack.Screen name="[id]" options={{ title: 'Quiz Questions', headerShown: false }} />
        <Stack.Screen name="review" options={{ title: 'Quiz Review', headerShown: false }} />
        <Stack.Screen name="results" options={{ title: 'Quiz Results', headerShown: false }} />
    </Stack>
  );
}
