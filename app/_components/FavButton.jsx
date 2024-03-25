import { Redirect, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/constants';

const styles = StyleSheet.create({
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

export default function FavButton(props) {
  const [error, setError] = useState('');

  if (error) {
    // console.log('user should redirect to login', error);
    return <Redirect href="/login" />;
  }
  // console.log('error:', error);

  async function saveFavorite() {
    // check if user is logged in
    const userResponse = await fetch(`/api/profile`).catch(console.error);
    const userData = await userResponse.json();
    console.log('user Data from save Fav:', userData);

    if (userData.error) {
      // console.log('user should redirect');
      setError(userData.error);
    }
    console.log(props.bookId);

    const response = await fetch(`/api/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userData.user.id,
        bookId: props.bookId,
      }),
    }).catch(console.error);

    const favorites = await response.json();
    console.log('data from favorite button:', favorites);
  }

  return (
    <View>
      <Pressable
        // style={styles.button}
        accessibilityLabel="Save this book to my favorites"
        onPress={saveFavorite}
        activateOpacity={0.3}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? '#fff' : colors.primaryColor,
          },
        ]}
      >
        <Text style={styles.buttonText}>Add to Favorites</Text>
      </Pressable>
    </View>
  );
}
