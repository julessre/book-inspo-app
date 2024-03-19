import { router, useLocalSearchParams, useNavigation } from 'expo-router';
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

const signupSchema = z.object({
  email: z.string().email(),
  passwordHash: z.string().min(1),
  firstName: z.string(),
  lastName: z.string(),
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
    marginTop: 30,
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

export default function SignUp() {
  const local = useLocalSearchParams();
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('');

  // signup for users
  async function handleSignup() {
    const userData = {
      email,
      passwordHash,
      firstName,
      lastName,
    };
    const validatedNewUser = signupSchema.safeParse(userData);
    console.log('validated signup:', validatedNewUser);
    console.log('userData:', userData);

    if (!validatedNewUser.success) {
      setErrorMessage('E-Mail already taken');
      setError(true);
    } else {
      const response = await fetch(`/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }).catch(console.error);
      const data = await response.json();
      console.log('signup:', data);

      if (response.ok) {
        // redirect to login screen
        router.navigate({
          pathname: '/login',
          params: local,
        });
      }

      if (!response.ok) {
        setErrorMessage(data.errors[0].message);
        setError(true);
      }

      if ('errors' in data) {
        setError(data.errors);
        return;
      }
    }
  }

  const handleGoToLogin = () => {
    router.push('/login');
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
              onChangeText={setPasswordHash}
            />
            <Text style={styles.title}>First Name:</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />
            <Text style={styles.title}>Last Name:</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
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
                accessibilityLabel="Sign up"
                onPress={handleSignup}
                activateOpacity={0.3}
                style={({ pressed }) => [
                  styles.button,
                  {
                    backgroundColor: pressed ? '#fff' : colors.primaryColor,
                  },
                ]}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </Pressable>
              <Pressable
                accessibilityLabel="Or go back to login"
                onPress={handleGoToLogin}
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
                <Text>Or go back to login</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
