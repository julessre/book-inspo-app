import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../styles/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLoading: {
    fontSize: 20,
    color: colors.text,
    fontFamily: 'Raleway-Italic',
    paddingTop: 20,
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
  // image: {
  //   flex: 1,
  // resizeMode: 'contain',
  // margin Top: 20,
  // overflow: 'hidden',
  // },
});

export default function FavScreen() {
  const [userWithBook, setUserWithBook] = useState(null);

  useEffect(() => {
    const apiFetch = async () => {
      const response = await fetch(`/api/favorites`).catch(console.error);
      const userData = await response.json();
      console.log('fetched favorites data:', userData);
      if (userData) {
        setUserWithBook(userData);
      }
    };
    apiFetch().catch(console.error);
  }, []);
  console.log('set books saved by user:', userWithBook);

  if (userWithBook?.error) {
    return <Redirect href="/login" />;
  }

  // loading screen
  if (!userWithBook) {
    return (
      <View style={styles.container}>
        <Text style={styles.textLoading}>Still loading..</Text>
      </View>
    );
  }

  const firstBookCoverImageLink = userWithBook.user.favorites[0].coverImageLink;
  const secondBookCoverImageLink =
    userWithBook.user.favorites[1].coverImageLink;
  // const thirdBookCoverImageLink = userWithBook.user.favorites[2].coverImageLink;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cover Images of books</Text>
      <View>
        <Image
          source={{ uri: firstBookCoverImageLink }}
          style={{ width: 120, height: 180 }}
        />
        <Image
          source={{ uri: secondBookCoverImageLink }}
          style={{ width: 120, height: 180 }}
        />
      </View>
    </View>
  );
}
