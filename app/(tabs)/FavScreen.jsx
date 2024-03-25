import { Redirect, router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
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

  return (
    <View style={styles.container}>
      <View>
        {userWithBook.user.favorites.map((favorite, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              router.navigate({
                pathname: `bookDetails/[id]`,
                params: { id: favorite.id },
              });
            }}
          >
            <Image
              key={index}
              source={{ uri: favorite.coverImageLink }}
              style={{ width: 120, height: 180 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
