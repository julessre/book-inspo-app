import { useFocusEffect, useNavigation } from 'expo-router';
// import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/constants';
// import checkLoginStatus from '../../util/checkloginstatus';
import { User } from '../types';

// type Props = {
//   user: User;
// };

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
});

export default function ProfileScreen() {
  const profilePic = require('../../assets/profilepic.png');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const apiFetch = async () => {
      const response = await fetch(`/api/profile`).catch(console.error);
      const user = await response.json();
      console.log('fetched profile data:', user);
      if (user) {
        setUser(user);
      }
      if (!user) {
        setUser(null);
        router.push('/login');
      }
    };
    apiFetch().catch(console.error);
  }, []);
  console.log('set user:', user);

  const logout = async () => {
    const response = await fetch(`/api/logout`).catch(console.error);
    const data = await response.json();
    if (data.success) {
      setUser(null);
      router.push('/login');
    }
  };

  if (user) {
    return (
      <View style={styles.container}>
        <Image source={profilePic} />
        <Text>
          {user.user.firstname} {user.user.lastname}
        </Text>
        <Pressable
          accessibilityLabel="logout here"
          onPress={logout}
          activateOpacity={0.3}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? '#fff' : colors.primaryColor,
            },
          ]}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    );
  } else {
    <View>
      <Pressable
        onPress={() => {
          router.push('/login');
        }}
      >
        Login to see profile
      </Pressable>
    </View>;
  }
}
