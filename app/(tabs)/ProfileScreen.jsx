import { useFocusEffect, useNavigation } from 'expo-router';
// import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/constants';
import { User } from '../types';

type Props = {
  user: User;
};

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

export default function ProfileScreen({ navigation}) {
  const profilePic = require('../../assets/profilepic.png');

  return (
    <View style={styles.container}>
      <Image source={profilePic} />
      <Text>Firstname Lastname</Text>
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
  );
}
