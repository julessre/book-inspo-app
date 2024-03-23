import { router } from 'expo-router';
import React from 'react';
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

export default async function FavButton() {
  async function saveFavorite(sessionToken: string, bookId: number);
  {
    const response = await fetch(`/api/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId }),
    }).catch(console.error);

    if (!response.ok) {
      throw new Error('Failed to save favorite book');
    }

    const data = await response.json();
    console.log('saved favorite:', data);
    return data;
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
