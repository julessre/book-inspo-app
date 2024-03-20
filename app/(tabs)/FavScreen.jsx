import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: colors.text,
  },
});

export default function FavScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <Text style={styles.text} onPress={() => navigation.navigate('Home')}>
          Favorites Screen
        </Text>
        <Pressable
          accessibilityLabel="Sign up to see your profile"
          onPress={() => navigation.navigate('(auth)/signup')}
          activateOpacity={0.3}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? '#fff' : colors.primaryColor,
            },
          ]}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
        <Pressable
          accessibilityLabel="Login to see your profile"
          onPress={() => navigation.navigate('(auth)/login')}
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
      </View>
    </SafeAreaView>
  );
}
