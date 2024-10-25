import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { auth } from './firebaseConfig'; // Import Firebase authentication configuration
import { signInWithEmailAndPassword, User } from 'firebase/auth'; // Import required methods

// Function to make protected API call to the Node.js backend
async function fetchProtectedData() {
  try {
    const token = await auth.currentUser?.getIdToken();
    const response = await fetch('http://localhost:5000/api/protected', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('Protected Data:', data);
  } catch (error) {
    console.error('Error fetching protected data:', error);
  }
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (auth) { // Ensure auth is defined before calling onAuthStateChanged
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
      });

      return () => unsubscribe();
    }
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, 'test@example.com', 'password');
      fetchProtectedData(); // Call protected API after logging in
    } catch (error) {
      console.error('Login Error: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout Error: ', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {user ? (
        <>
          <Text>Welcome, {user.email}</Text>
          <Button title="Fetch Protected Data" onPress={fetchProtectedData} />
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          <Text>Please log in</Text>
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

export default App;
