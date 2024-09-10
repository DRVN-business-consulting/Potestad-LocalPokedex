import { View, StyleSheet, Button, Image, SafeAreaView, Alert, TextInput, Text } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import * as Crypto from 'expo-crypto'

const LoginScreen = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const usernamecreds = 'ana';
    const passwordcreds = 'hailey';

    const hashString = async (input) => {
        return await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            input
        );
    };

    const login = async () => {
        if (username === '' || password === '') {
            Alert.alert('Username and password are required');
        } else if (username !== usernamecreds || password !== passwordcreds) {
            Alert.alert('Invalid credentials');
        } else {
            try {
                const hashedUsername = await hashString(usernamecreds);
                const hashedPassword = await hashString(passwordcreds);

                await SecureStore.setItemAsync('username', hashedUsername);
                await SecureStore.setItemAsync('password', hashedPassword);
    
                router.replace('pokedex/(tabs)');
    
                const storedHashedUsername = await SecureStore.getItemAsync('username');
            } catch (error) {
                console.error('Error saving credentials:', error);
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.container}>
                <View style={{ marginHorizontal: 20}}>
                    <Image source={require('../assets/logo-ai.jpg')} style={{ resizeMode: 'cover', width: 380, height: 380, margin: 'auto', marginBottom: 10}} />
                    <Text style={{ marginVertical: 10, fontSize:18}}>Username</Text>
                    <TextInput
                        value={username}
                        onChangeText={(value) => setUsername(value)}
                        style=
                            {{ 
                                height: 40,
                                width: '100%',
                                borderColor: 'pink',
                                borderWidth: 2,
                                padding: 10,
                            }}
                        placeholder="Enter username"
                    />
                    <Text style={{ marginVertical: 10, fontSize:18}}>Password</Text>
                    <TextInput
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        style=
                        {{ 
                            height: 40,
                            width: '100%',
                            borderColor: 'pink',
                            borderWidth: 2,
                            padding: 10,
                            marginBottom : 18
                        }}
                        placeholder="Enter password"
                    />
                    <Button title="Login" color="pink" onPress={login}/>
                </View>       
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
        width: '100%'
    }
})

export default LoginScreen