import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

const students = [
  {
    id: '1',
    name: 'Aman Singh',
    grade: 'A+',
    attendance: '98%',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    grade: 'A',
    attendance: '95%',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Rahul Verma',
    grade: 'B+',
    attendance: '92%',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    name: 'Sneha Patel',
    grade: 'A',
    attendance: '97%',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

const HomeScreen = () => {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>
          Welcome to Dashboard
        </Text>
        <Pressable onPress={signOut} style={styles.signOutBtn}>
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </View>

      <Text style={styles.subHeader}>Class Performance Overview</Text>

      <FlatList
        data={students}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>Grade: {item.grade}</Text>
              <Text style={styles.meta}>Attendance: {item.attendance}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: { fontSize: 18, fontWeight: '700', color: '#111827' },
  subHeader: { fontSize: 16, color: '#6B7280', marginVertical: 12 },
  signOutBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  signOutText: { fontWeight: '700' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#111827' },
  meta: { fontSize: 14, color: '#6B7280' },
});

export default HomeScreen;
