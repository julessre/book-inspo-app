import { Redirect, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  DevSettings,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { colors } from '../../styles/constants';

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
    // flex: 1,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  containerProgress: {
    // flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  profilePic: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: 10,
  },

  textLoading: {
    fontSize: 20,
    color: colors.text,
    fontFamily: 'Raleway-Italic',
    paddingTop: 20,
  },
  textName: {
    fontSize: 25,
    color: colors.text,
    fontFamily: 'Raleway-Bold',
    paddingTop: 10,
    borderBottomWidth: 5,
    borderBottomColor: colors.primaryColor,
    paddingBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.text,
    fontFamily: 'Raleway-Medium',
    paddingTop: 20,
    borderBottomWidth: 5,
    borderBottomColor: colors.primaryColor,
    paddingBottom: 10,
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
    marginBottom: 10,
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
  const chart = require('../../assets/chart.png');
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const apiFetch = async () => {
      const response = await fetch(`/api/profile`).catch(console.error);
      const userData = await response.json();
      // console.log('fetched profile data:', userData);
      if (userData) {
        setUser(userData);
      }
    };
    apiFetch().catch(console.error);
  }, []);
  // console.log('set user:', user);

  // if (user !== null && user.error)
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
          <Text style={styles.textName}>
            {user.user.firstname} {user.user.lastname}
          </Text>
        </View>
        <View style={styles.line}></View>
      </View>
      <View style={styles.containerProgress}>
        <Text style={styles.textLoading}>Your progress:</Text>
        <ProgressBar
          progress={0.4}
          width={320}
          color={colors.primaryColor}
          backgroundColor={'white'}
          height={10}
          borderRadius={10}
          marginTop={15}
        />
        <Text style={styles.text}>
          You have read 5 out of your 12 favorite books. Keep going!
        </Text>
        <Image source={chart} />
      </View>
      <View>
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
