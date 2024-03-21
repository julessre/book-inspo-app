import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
// import checkLoginStatus from '../../util/checkloginstatus';
// import { colors } from '../../styles/constants';
import BookItem from '../_components/BookItem';

type Book = {
  id: string;
  title: string;
  author: string;
  publishingYear: number;
  description: string;
  numberOfPages: number;
  coverImageLink: string;
};

const renderItem = (item: { item: Book }) => <BookItem book={item.item} />;

export default function HomeScreen() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function callApi() {
      const response = await fetch('/api/books');
      const fetchedBooks = await response.json();
      setBooks(fetchedBooks.showBooks);
      console.log(fetchedBooks);
    }
    callApi().catch(console.error);
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item: Book) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
      />
    </SafeAreaView>
  );
}
