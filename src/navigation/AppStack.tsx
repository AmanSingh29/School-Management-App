import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import HomeScreen from '../screens/home/HomeScreen';
import { AppStackParamList } from '../types';

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
              <Text style={{ fontSize: 20 }}>☰</Text>
            </TouchableOpacity>
          ),
        })}
      />
      {/* other screens... */}
    </Stack.Navigator>
  );
}
