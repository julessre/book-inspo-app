import {
  CommonActions,
  StackActions,
  TabActions,
} from '@react-navigation/native';
import { Redirect, router, useFocusEffect, useNavigation } from 'expo-router';
// import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  DevSettings,
  Image,
  NativeModules,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  containerInfo: {
    flex: 5,
    paddingTop: 90,
    paddingLeft: 30,
    paddingRight: 30,
  },
  profilePic: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: 20,
  },
  containerButton: {
    flex: 1,
  },
  textLoading: {
    fontSize: 25,
    color: colors.text,
    fontFamily: 'Raleway-Italic',
    paddingTop: 20,
  },
  text: {
    fontSize: 25,
    color: colors.text,
    fontFamily: 'Raleway-Bold',
    paddingTop: 20,
    borderBottomWidth: 5,
    borderBottomColor: colors.primaryColor,
    paddingBottom: 10,
    textAlign: 'center',
  },
  nameContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  line: {
    borderTopColor: colors.primaryColor,
    borderTopWidth: 2,
    paddingLeft: 90,
    paddingRight: 90,
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

//  LOG  fetched profile data: {"error": "user not found"}
//  LOG  set user: {"error": "user not found"}
//  LOG  set user: {"error": "user not found"}

export default function ProfileScreen() {
  const profilePic = require('../../assets/profilepic.png');
  const navigation = useNavigation();
  // const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const apiFetch = async () => {
      const response = await fetch(`/api/profile`).catch(console.error);
      const userData = await response.json();
      console.log('fetched profile data:', userData);
      if (userData) {
        setUser(userData);
      }
    };
    apiFetch().catch(console.error);
  }, []);
  console.log('set user:', user);

  // if (user !== null && user.error)
  // if (user && user.error)
  if (user?.error) {
    return <Redirect href="/login" />;
  }

  // loading screen
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.textLoading}>Still loading..</Text>
      </View>
    );
  }

  const logout = async () => {
    const response = await fetch(`/api/logout`).catch(console.error);
    const data = await response.json();
    if (data.success) {
      setUser(null);
    }
    navigation.navigate('Home');
    DevSettings.reload();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <View style={styles.profilePic}>
          <Image source={profilePic} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.text}>
            {user.user.firstname} {user.user.lastname}
          </Text>
        </View>
        <View style={styles.line}></View>
      </View>
      <View style={styles.containerButton}>
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
    </View>
  );
}
