import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useTheme } from '../../../src/context/ThemeContext'
import { myTheme } from '../../themes/myTheme';
import { router } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {

  const { theme, toggleTheme } = useTheme();

  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully!');
      router.replace('/');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={[styles.container, { backgroundColor: theme === 'light' ? 'red' : 'black'}]}>
        <View style={[{marginBottom: 10}]}>
          {/* <Text style={[styles.label, { color: themeColors[theme].textColor, marginBottom: 10 }]}>Toggle Theme</Text> */}
            <TouchableOpacity onPress={toggleTheme} style={styles.backButton}>
              <Image 
                  source={require('../../../assets/darkmode.png')}
                  style={[
                      { width: 30, height: 30 },
                      { tintColor: theme === 'light' ? 'white' : 'red' } 
                  ]}
              />
                <Text 
                  style={[
                      { marginLeft: 6 , fontSize: 20},
                      { color: theme === 'light' ? 'white' : 'red' },
                      theme === 'dark' && { fontWeight: 'bold' }
                  ]}>Dark Mode
              </Text>
            </TouchableOpacity>
        </View>
          <TouchableOpacity onPress={handleSignOut} style={styles.backButton}>
            <FontAwesome6 
                name="right-from-bracket"
                size={30} 
                color={theme === 'light' ? 'white' : 'red'}
                solid 
            />
             <Text 
                  style={[
                      { marginLeft: 6 , fontSize: 20},
                      { color: theme === 'light' ? 'white' : 'red' },
                      theme === 'dark' && { fontWeight: 'bold' }
                  ]}>Sign out
              </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create(
  {
    container: { flex: 1, padding: 20},
    label: { fontSize: 18},
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
  }
)

export default SettingScreen