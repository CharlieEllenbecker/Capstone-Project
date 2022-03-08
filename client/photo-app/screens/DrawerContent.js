import react, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export function DrawerContent(props) {
  //   const toggleTheme = () => {
  //     setIsDarkTheme(!isDarkTheme);
  //   };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const [Darkmode, setDarkMode] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View styles={styles.drawerContent}>
          {/* User Info Sart */}
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: 'https://www.animatedtimes.com/wp-content/uploads/2021/11/One-Piece-998-Spoilers-1024x578-1.jpg',
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>John Doe</Title>
                <Caption style={styles.caption}>@WhoAmI?</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
            {/* User Info End */}
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => <MaterialCommunityIcons name="home-outline" color={color} size={size} />}
              label="Home"
              onPress={() => {
                props.navigation.navigate('HomeDrawer');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => <MaterialCommunityIcons name="account-outline" color={color} size={size} />}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => <MaterialCommunityIcons name="bookmark-outline" color={color} size={size} />}
              label="Bookmarks"
              onPress={() => {
                props.navigation.navigate('Bookmarks');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                //toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View>
                  <Switch
                    value={Darkmode}
                    onValueChange={(val) => {
                      setDarkMode((val) => !val);
                      EventRegister.emit('changeThemeEvent', val);
                    }}
                  />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => <MaterialCommunityIcons name="exit-to-app" color={color} size={size} />}
          label="Sign Out"
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
