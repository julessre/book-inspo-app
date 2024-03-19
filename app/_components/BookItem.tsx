import { router } from 'expo-router';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../styles/constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    width,
    height,
    backgroundColor: colors.background,
  },
  image: {
    flex: 1,
    height: height,
    resizeMode: 'stretch',
    marginTop: 20,
  },
  infoBox: {
    backgroundColor: colors.background,
    borderTopColor: colors.primaryColor,
    borderTopWidth: 4,
    padding: 20,
    paddingBottom: 0,
    flex: 0.6,
  },

  textHeadline: {
    fontSize: 35,
    color: colors.text,
    fontFamily: 'Raleway-Bold',
  },
  textAuthor: {
    fontSize: 25,
    color: colors.text,
    fontFamily: 'Raleway-Italic',
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

type Props = {
  book: Book;
};

export default function BookItem({ book }: Props) {
  const { title, author, coverImageLink } = book;

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: coverImageLink }} style={styles.image} />
      <View style={styles.infoBox}>
        <TouchableOpacity
          onPress={() => {
            router.navigate({
              pathname: `bookDetails/[id]`,
              params: { id: book.id },
            });
          }}
        >
          <Text style={styles.textHeadline}>{title} </Text>
          <Text style={styles.textAuthor}>{author} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
