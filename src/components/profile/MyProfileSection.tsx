import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createDrawerOptions } from '../../constants/drawerOptions';
import { useAuth } from '../../context/AuthContext';

export const MyProfileSection = ({
  navigation,
}: DrawerContentComponentProps) => {
  const { signOut, user: userData } = useAuth();

  const goToProfile = () => {
    navigation.navigate('Profile' as any);
  };

  const options = createDrawerOptions({
    goToProfile,
    logout: signOut,
    closeDrawer: () => navigation.closeDrawer(),
  });

  if (!userData) return <Text>Something went wrong!</Text>;

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
              <Icon height={30} width={30} />
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#d9f1e8ff"
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
    paddingHorizontal: 10,
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
