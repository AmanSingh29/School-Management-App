import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { MyProfileSection } from '../components/profile/MyProfileSection';

const Drawer = createDrawerNavigator();

export default function RootNavigator() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <AuthStack />;

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerStyle: { width: "70%" } }}
      drawerContent={props => <MyProfileSection {...props} />}
    >
      <Drawer.Screen name="App" component={AppStack} />
    </Drawer.Navigator>
  );
}
