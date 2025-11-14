// App.tsx
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';
import { AuthProvider } from './src/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const scheme = useColorScheme(); // 'dark' or 'light'
  const barStyle = scheme === 'dark' ? 'light-content' : 'dark-content';
  const backgroundColor = scheme === 'dark' ? '#000' : '#fff';

  return (
    <AuthProvider>
      <SafeAreaProvider>
        {/* StatusBar controls icon color + Android background */}
        <StatusBar
          barStyle={barStyle} // icons/text color
          backgroundColor={backgroundColor} // Android background color
          translucent={false} // set to true if you want content under status bar
          animated={true}
        />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
