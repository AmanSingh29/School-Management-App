import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { SvgProps } from 'react-native-svg';

type MenuItem = {
  id: number;
  text: string;
  Icon: React.FC<SvgProps>;
};

type MenuCardProps = {
  title: string;
  items: MenuItem[];
};

const MenuCard = ({ title, items }: MenuCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.innerContainer}>
        {items.map(({ Icon, id, text }) => (
          <TouchableOpacity style={styles.menuItem} key={id}>
            <Icon height={50} width={50} />
            <Text>{text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  innerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 16,
    alignItems: 'center',
  },
  menuItem: {
    width: '25%',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
});
