// --- path: src/screens/Auth/LoginScreen.tsx
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import InputBox, { InputRef } from '../../components/common/InputBox';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const { signIn } = useAuth();

  const passwordRef = useRef<InputRef>(null);

  const validate = () => {
    const next: typeof errors = {};
    if (!username) next.username = 'Username is required';

    if (!password) next.password = 'Password is required';
    else if (password.length < 6)
      next.password = 'Must be at least 6 characters';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onLogin = async () => {
    if (!validate()) return;
    // Replace with your API call
    await signIn(username);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>School Management Login</Text>

      <InputBox
        label="Username"
        placeholder="username"
        value={username}
        onChangeText={setUsername}
        kind="text"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        errorText={errors.username}
        helperText={
          !errors.username ? 'Use your registered school username' : undefined
        }
        accessibilityLabel="login-username"
      />

      <View style={{ height: 16 }} />

      <InputBox
        ref={passwordRef}
        label="Password"
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        kind="password"
        returnKeyType="done"
        onSubmitEditing={onLogin}
        errorText={errors.password}
        accessibilityLabel="login-password"
      />

      <View style={{ height: 24 }} />

      <Pressable style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  button: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
