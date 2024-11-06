import Logo from '@/components/Logo';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';

export default function RegistrationLayout() {
  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        header: () => <SafeAreaView style={{ backgroundColor: '#603F26'}}><Logo style={[{ fontSize: 30, color: "#FFDBB5" }]} /></SafeAreaView>,
        // headerTitle: "Registeration"
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
