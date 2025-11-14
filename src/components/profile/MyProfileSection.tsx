import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createDrawerOptions } from '../../constants/drawerOptions';
import { useAuth } from '../../context/AuthContext';

const userData = {
  name: 'Aman Singh',
  className: '12',
  profilePic: '',
};

export const MyProfileSection = ({
  navigation,
}: DrawerContentComponentProps) => {
  const { signOut } = useAuth();

  const goToProfile = () => {
    navigation.navigate('Profile' as any);
  };

  const options = createDrawerOptions({
    goToProfile,
    logout: signOut,
    closeDrawer: () => navigation.closeDrawer(),
  });

  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawerContainer}>
      {/* Profile Header */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri:
              userData.profilePic ||
              'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.profilePic}
        />
        <Text style={styles.profileName}>{userData.name}</Text>
        <Text style={styles.profileClass}>Class: {userData.className}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionList}>
        {options.map((opt, index) => {
          const Icon = opt.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={() => {
                opt.onPress();
                navigation.closeDrawer();
              }}
            >
              <Icon height={20} width={20} />
              <Text style={styles.optionText}>{opt.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
};

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
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
});
