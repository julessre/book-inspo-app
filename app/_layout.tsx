import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '../styles/constants';
import Login from './(auth)/login';
import SignUp from './(auth)/signup';
import TabNavigator from './(tabs)/_layout';
import HomeScreen from './(tabs)/HomeScreen';
import BookDetailsPage from './bookDetails/[id]';

// import UserProfile from './profile/userProfile';

// eslint-disable-next-line @typescript-eslint/naming-convention
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default function HomeLayout() {
  const [fontsLoaded] = useFonts({
    'Raleway-Medium': require('../assets/font/Raleway-Medium.ttf'),
    'Raleway-Italic': require('../assets/font/Raleway-Italic.ttf'),
    'Raleway-Bold': require('../assets/font/Raleway-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily: 'Raleway-Bold',
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="bookDetails/[id]"
          component={BookDetailsPage}
          options={{
            title: 'Book Details',

            headerBackTitleVisible: false,
            headerShadowVisible: false,
            contentStyle: {
              borderTopColor: colors.primaryColor,
              borderTopWidth: 3,
            },
          }}
        />

        <Stack.Screen
          name="(auth)/signup"
          component={SignUp}
          options={{
            title: 'Sign-up',

            headerBackTitleVisible: false,
            headerShadowVisible: false,
            contentStyle: {
              borderTopColor: colors.primaryColor,
              borderTopWidth: 3,
            },
          }}
        />
        <Stack.Screen
          name="(auth)/login"
          component={Login}
          options={{
            title: 'Login',

            headerBackTitleVisible: false,
            headerShadowVisible: false,
            contentStyle: {
              borderTopColor: colors.primaryColor,
              borderTopWidth: 3,
            },
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
