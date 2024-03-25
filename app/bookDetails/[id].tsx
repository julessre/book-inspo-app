import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { isPropertyAccessOrQualifiedName } from 'typescript';
import { colors } from '../../styles/constants';
import FavButton from '../_components/FavButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  table: {
    flex: 0.75,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 40,
  },
  itemContainer: {
    width: '50%',
    height: 250,
    borderColor: colors.background,
    borderWidth: 4,
  },

  textIcon: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Raleway-Medium',
    paddingLeft: 30,
    paddingRight: 10,
    paddingTop: 40,
  },

  text: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Raleway-Medium',
    paddingLeft: 10,
    paddingRight: 10,
  },

  textHeadline: {
    fontSize: 35,
    color: colors.text,
    fontFamily: 'Raleway-Bold',
    paddingBottom: 10,
  },
  textAuthor: {
    fontSize: 25,
    color: colors.text,
    fontFamily: 'Raleway-Italic',
  },
  image: {
    flex: 2,
    resizeMode: 'contain',
    marginTop: 20,
    // overflow: 'hidden',
  },
  descriptionContainer: {
    marginTop: 50,
  },
  button: {
    flex: 0.5,
    backgroundColor: colors.primaryColor,
    fontSize: 20,
    color: colors.text,
    fontFamily: 'Raleway-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 90,
  },
});

type Book = {
  id: string;
  title: string;
  author: string;
  publishingYear: number;
  description: string;
  numberOfPages: number;
  coverImageLink: string;
};

export default function BookDetailsPage() {
  const { id } = useLocalSearchParams();
  const [singleBook, setSingleBook] = useState<Book>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBookById() {
      if (typeof id !== 'string') {
        return;
      }
      const response = await fetch(`/api/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const fetchedBook = await response.json();
      setSingleBook(fetchedBook.bookDetail);
      console.log(fetchedBook);
      setIsLoading(false);
    }
    getBookById().catch(console.error);
  }, [id]);

  if (!singleBook) {
    return null;
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.container}>
          <Text>Loading Book Details...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.textHeadline}>{singleBook.title}</Text>
          <Text style={styles.textAuthor}>{singleBook.author}</Text>
          <View style={styles.table}>
            <Image
              source={{ uri: singleBook.coverImageLink }}
              style={styles.image}
            />
            <View style={styles.itemContainer}>
              <Text style={styles.textIcon}>
                <Ionicons
                  name="calendar"
                  size={30}
                  color={colors.primaryColor}
                />
                {'  '}
                {singleBook.publishingYear}{' '}
              </Text>
              <Text style={styles.textIcon}>
                <Ionicons
                  name="document"
                  size={30}
                  color={colors.primaryColor}
                />
                {'  '}
                {singleBook.numberOfPages}
              </Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.text}>{singleBook.description} </Text>
          </View>
          <View>
            <FavButton bookId={singleBook.id} />
          </View>
        </>
      )}
    </View>
  );
}
