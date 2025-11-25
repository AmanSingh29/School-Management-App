import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import HomeScreen from '../screens/home/HomeScreen';
import { AppStackParamList } from '../types';
import NotificationBellIcon from '../assets/icons/bell-svgrepo-com.svg';
import HamburgerIcon from '../assets/icons/hamburger-menu-svgrepo-com.svg';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 12 }}
              onPress={() =>
                navigation.getParent()?.dispatch(DrawerActions.toggleDrawer())
              }
            >
              <HamburgerIcon height={30} width={30} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 12 }}
              onPress={() => {}}
            >
              <NotificationBellIcon height={30} width={30} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#e1ece8',
          },
        })}
      />
      {/* other screens... */}
    </Stack.Navigator>
  );
}
