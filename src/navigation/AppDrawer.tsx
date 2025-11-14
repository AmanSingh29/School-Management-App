// src/navigation/AppDrawer.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export type ProfileData = {
  name: string;
  className: string;
  profilePic?: string;
};

type DrawerOption = {
  title: string;
  onPress: () => void;
};

type AppDrawerProps = {
  /** The screen to render inside the drawer (Home, etc.) */
  children: React.ReactNode;
  /** Student data to show in drawer header */
  profile: ProfileData;
  /** List of options (e.g. Classes, Logout) */
  options: DrawerOption[];
};

const CustomDrawerContent = ({
  profile,
  options,
  navigation,
}: DrawerContentComponentProps & {
  profile: ProfileData;
  options: DrawerOption[];
}) => {
  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawerContainer}>
      {/* Profile Header */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri:
              profile.profilePic ||
              'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.profilePic}
        />
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileClass}>Class: {profile.className}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionList}>
        {options.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionItem}
            onPress={() => {
              opt.onPress();
              navigation.closeDrawer();
            }}
          >
            <Text style={styles.optionText}>{opt.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </DrawerContentScrollView>
  );
};

/** Common Drawer wrapper */
const AppDrawer = ({ children, profile, options }: AppDrawerProps) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: 280 },
        }}
        drawerContent={(props) => (
          <CustomDrawerContent {...props} profile={profile} options={options} />
        )}
      >
        <Drawer.Screen name="Main">{() => children}</Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: '#f9f9f9',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileClass: {
    fontSize: 14,
    color: '#666',
  },
  optionList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  optionItem: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
  },
});
