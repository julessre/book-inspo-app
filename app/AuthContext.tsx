// import * as SecureStore from 'expo-secure-store';
// import { createContext, useContext, useEffect, useState } from 'react';
// import { Alert } from 'react-native';
// import { SERVER } from '../config';
// import { Token, User, UserToken } from './types';

// type AuthProps = {
//   isLogged: boolean;
//   loading: boolean;
//   logIn(email: string, password: string): Promise<any>;
//   signUp(email: string, password: string): Promise<any>;
//   logout(socketRef: Socket | undefined): Promise<any>;
//   lastError: Error | undefined;
//   user: UserToken | undefined;
//   setUser: React.Dispatch<React.SetStateAction<UserToken | undefined>>;
// };

// const AuthContext = createContext<AuthProps | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isLogged, setIsLogged] = useState<boolean>(false);
//   const [user, setUser] = useState<UserToken | undefined>();
//   const [lastError, setLastError] = useState<Error | undefined>();

//   // Handle Case token expired
//   useEffect(() => {
//     async function getToken() {
//       setLoading(true);
//       const tok = await SecureStore.getItemAsync('token');
//       const exp = await SecureStore.getItemAsync('expiration');
//       const usr = await SecureStore.getItemAsync('user');
//       const following = await SecureStore.getItemAsync('following');

//       if (tok && usr && exp && following) {
//         //TOKEN EXPIRED
//         if (exp < String(Date.now())) {
//           Alert.alert('Your session has expired');
//           await logOut();
//           setLoading(false);
//           return;
//         }

//         //TOKEN ACTIVE
//         setUser({
//           email: usr,
//           token: {
//             value: tok,
//             expiration: exp,
//           },
//           following: JSON.parse(following),
//         });
//         setIsLogged(true);
//       }

//       setLoading(false);
//     }
//     getToken();
//   }, []);

//   async function logIn(email: string, password: string) {
//     try {
//       const res = await fetch(`/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       });
//       const data = await res.json();

//       //response 200
//       //update state and store the token in secure storage

//       if (res.ok) {
//         setLastError(undefined);
//         setUser({
//           email: data.user.email,
//           token: data.token,
//           following: data.user.following,
//         });

//         //store data to secure store
//         await SecureStore.setItemAsync('token', data.token.value);
//         await SecureStore.setItemAsync(
//           'expiration',
//           String(Date.now() + data.token.expiration * 1000),
//         );
//         await SecureStore.setItemAsync('user', data.user.username);
//         await SecureStore.setItemAsync(
//           'following',
//           JSON.stringify(data.user.following),
//         );

//         setIsLogged(true);
//       } else {
//         throw new Error(data.error);
//       }
//     } catch (error) {
//       setLastError(error as Error);
//       throw error as Error;
//     }
//   }

//   async function signUp(email: string, password: string) {
//     try {
//       const res = await fetch(`/auth/signup`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setLastError(undefined);
//         setUser({
//           username: data.user.username,
//           token: data.token,
//           following: data.user.following,
//         });

//         //store data to secure store
//         await SecureStore.setItemAsync('token', data.token.value);
//         await SecureStore.setItemAsync(
//           'expiration',
//           String(Date.now() + data.token.expiration * 1000),
//         );
//         await SecureStore.setItemAsync('user', data.user.username);
//         await SecureStore.setItemAsync(
//           'following',
//           JSON.stringify(data.user.following),
//         );

//         setIsLogged(true);
//       } else {
//         throw new Error(data.error);
//       }
//     } catch (error) {
//       setLastError(error as Error);
//       throw error as Error;
//     }
//   }

//   async function logOut(socketRef: Socket | undefined = undefined) {
//     try {
//       //delete token from storage
//       await SecureStore.deleteItemAsync('token');
//       await SecureStore.deleteItemAsync('user');
//       await SecureStore.deleteItemAsync('expiration');
//       await SecureStore.deleteItemAsync('following');
//       //update logging state
//       setUser(undefined);
//       setIsLogged(false);
//       if (socketRef) {
//         socketRef.disconnect();
//       }
//     } catch (error) {
//       setLastError(error as Error);
//       throw error as Error;
//     }
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         loading,
//         isLogged,
//         logIn,
//         signUp,
//         logOut,
//         lastError,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (context === undefined) {
//     throw new Error('Context is undefined');
//   }

//   return context;
// };
