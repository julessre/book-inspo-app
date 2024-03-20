import { router, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { z } from 'zod';
import { colors } from '../../styles/constants';

// import { useAuth } from '../AuthContext';

// change min to larger number after testing!!!
const loginSchema = z.object({
  email: z.string().email(),
  passwordHash: z.string().min(1),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.text,
    fontFamily: 'Raleway-Italic',
    marginTop: 20,
    width: 250,
  },
  inputContainer: {
    marginTop: 120,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: colors.primaryColor,
    fontSize: 15,
    color: colors.text,
    fontFamily: 'Raleway-Medium',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    borderWidth: 2,
    borderRadius: 20,
    width: 250,
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 25,
    marginBottom: -30,
    width: 150,
    padding: 15,
  },
  buttonText: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'Raleway-Medium',
  },
  loginText: {
    marginTop: 40,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default function Login() {
  // const { logIn, lastError } = useAuth();
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  async function handleLogin() {
    const userData = {
      email,
      passwordHash,
    };

    // input validation
    const validatedLogin = loginSchema.safeParse(userData);
    console.log('validated Login:', validatedLogin);
    if (!validatedLogin.success) {
      setErrorMessage('E-Mail or password invalid');
      setError(true);
    } else {
      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }).catch(console.error);

      const data = await response.json();
      console.log('fetched data:', data);

      if (!response.ok) {
        setErrorMessage(data.errors[0].message);
        setError(true);
      }

      if (response.ok) {
        router.navigate('../../ProfileScreen');

        console.log('login is working');
      }
    }
  }

  const handleGoToSignup = () => {
    router.push('/signup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Email:</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError('false');
                setErrorMessage('');
              }}
            />

            <Text style={styles.title}>Password:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={passwordHash}
              onChangeText={(text) => {
                setPasswordHash(text);
                setError('false');
                setErrorMessage('');
              }}
            />
            <Text
              type="error"
              style={{ color: 'red' }}
              visible={error ? true : false}
            >
              {errorMessage}
            </Text>
            <View>
              <Pressable
                accessibilityLabel="Login"
                onPress={handleLogin}
                activateOpacity={0.3}
                style={({ pressed }) => [
                  styles.button,
                  {
                    backgroundColor: pressed ? '#fff' : colors.primaryColor,
                  },
                ]}
              >
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
              <Pressable
                accessibilityLabel="Or register here!"
                onPress={handleGoToSignup}
                activateOpacity={0.3}
                style={({ pressed }) => [
                  styles.loginText,
                  {
                    backgroundColor: pressed ? '#fff' : colors.background,
                    borderRadius: 20,
                    padding: 5,
                  },
                ]}
              >
                <Text>Or register here!</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
