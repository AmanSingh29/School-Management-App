import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
// import DrawerContent from './DrawerContent'; // optional custom content

const Drawer = createDrawerNavigator();

export default function RootNavigator() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <AuthStack />;

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerStyle: { width: 280 } }}
      // drawerContent={(props) => <DrawerContent {...props} />} // optional
    >
      <Drawer.Screen name="App" component={AppStack} />
    </Drawer.Navigator>
  );
}
