// import React, { useEffect } from 'react';
// import { Image, StyleSheet, Text, View } from 'react-native';
// import { colors } from '../../styles/constants';
// import { User } from '../types';

// type Props = {
//   user: User;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 20,
//     color: colors.text,
//   },
// });

// export default function UserProfile() {
//   const profilePic = require('../../assets/profilepic.png');

//   // API REQUEST - to fetch user information
//   useEffect(() => {
//     const apiFetch = async () => {
//       const response = await fetch(`/api/profile`).catch(console.error);
//       const data = await response.json();
//       console.log('fetched profile data:', data);
//     };
//     apiFetch().catch(console.error);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Image source={profilePic} />
//       <Text> Hallo Test</Text>
//     </View>
//   );
// }
