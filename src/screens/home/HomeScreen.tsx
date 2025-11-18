import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import MenuCard from '../../components/homescreen/MenuCard';
import { E_LEARNING_MENU_ITEMS } from '../../constants';

const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri:
              user?.profilePic ||
              'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.profilePic}
        />
        <Text style={styles.profileName}>{user?.name}</Text>
        <Text style={styles.profileClass}>Class: {user?.className}</Text>
      </View>

      {/* White Content Section */}
      <View style={{ backgroundColor: '#e1ece8' }}>
        <View style={styles.whiteSection}>
          <MenuCard title="E Learning" items={E_LEARNING_MENU_ITEMS} />
          <MenuCard title="E Learning" items={E_LEARNING_MENU_ITEMS} />
          <MenuCard title="E Learning" items={E_LEARNING_MENU_ITEMS} />
          {/* Add more content to test scrolling */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#e1ece8',
  },

  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ffffff',
  },

  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  profileClass: {
    fontSize: 14,
    color: '#666',
  },

  whiteSection: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
});

export default HomeScreen;
