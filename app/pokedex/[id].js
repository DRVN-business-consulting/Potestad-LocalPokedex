import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { colors, themeColors, typeColors } from '../themes/colors'
import { API_URL } from '../constants'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { myTheme } from '../themes/myTheme'
import { useFavorites  } from '../../src/context/FavoriteThemeContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../src/context/ThemeContext'

const ViewPokemon = () => {

    const { id } = useLocalSearchParams()
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(true);
    const { isFavorite, toggleFavorite } = useFavorites()
    const { theme } = useTheme()

    const viewDetails = async (id) => {
        const { data } = await axios.get(`${API_URL}/pokemon/${id}`)
        setDetails(data[0])
        setLoading(false)
    }
    
    useEffect(() => {
        setLoading(true)
        viewDetails(id)
    }, [])

    if(loading) {
        return <ActivityIndicator />
    }
    
    const names = details.name;
    const typeColor = typeColors[details.type.join("-").toLowerCase()]||typeColors.others
    const foreColor = typeColor.foreColor
    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1, backgroundColor: typeColor.bg }}>
                <View style={[styles.container, { backgroundColor: typeColor.bg}]}>
                    <View style={[styles.imageContainer , { borderColor: themeColors[theme].container, backgroundColor: themeColors[theme].container}]}>
                        <Image source={{ uri: `${API_URL}${details.image.hi_res}`}}   style={[styles.image, {backgroundColor: themeColors[theme].container}]}  />
                        <TouchableOpacity 
                                onPress={() => toggleFavorite(details)} style={{alignSelf: 'flex-end', marginRight: 10, padding: 5}}
                            >
                            <FontAwesome6 
                                name="heart" 
                                size={24} 
                                color={isFavorite(details.id) ? 'red' : 'gray'} 
                                solid={isFavorite(details.id)} 
                                
                            />
                        </TouchableOpacity>
                    </View>
                   
                    <View style={{ alignSelf: 'start', marginTop: 15}}>
                    {
                        Object.entries(names).map(([key, value]) => {
                            return  (
                                <View style={styles.sectionContainer} key={key}>
                                    <Text style={[myTheme.textWhite, { fontWeight: 'bold', textTransform: 'capitalize', fontSize: 20, }]}>{`${key}:`}</Text>
                                    <Text style={[myTheme.textWhite, { fontSize: 20}]}>{`${value}`}</Text>
                                </View>
                            )
                        })
                    }
                    </View>
                    <Text style={[styles.section, { color: foreColor, marginTop: 20}]}>BASE</Text>
                    <View style={{ alignSelf: 'start'}}>
                    {
                        Object.entries(details.base).map(([key, value]) => {
                            return  (
                                <View style={styles.sectionContainer} key={key}>
                                    <Text style={[myTheme.textWhite, { fontWeight: 'bold', textTransform: 'capitalize', fontSize: 20, }]}>{`${key}:`}</Text>
                                    <Text style={[myTheme.textWhite, { fontSize: 20}]}>{`${value}`}</Text>
                                </View>
                            )
                        })
                    }
                    </View>
                    <Text style={[styles.section, { color: foreColor,  marginTop: 20}]}>TYPE</Text>
                    {
                        details.type.map(type =>  <Text key={type} style={[myTheme.textWhite, { fontSize: 20}]}>{`${type}`}</Text> )
                    }
                    <Text style={[styles.section, { color: foreColor,  marginTop: 20}]}>ABILITIES</Text>
                    {
                        details.profile.ability.map(ability =>  <Text key={ability[0]} style={[myTheme.textWhite, { fontSize: 20}]}>{`${ability[0]}`}</Text> )
                    }
                </View>     
            </SafeAreaView>   
        </ScrollView>   
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    section: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    sectionContainer: { display: 'flex',  flexDirection: 'row', columnGap: 10},
    imageContainer: {
        width: '100%', 
        borderRadius: 20, 
        borderWidth: 5,  alignSelf: 'center', 
        marginBottom: 15, backgroundColor: 'white', 
    },
    image: { 
      resizeMode: 'contain',
      width: '100%',
      height: 250, 
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      borderWidth: 5,  
      alignSelf: 'center', 
      marginBottom: 15, 
      backgroundColor: 'white', 
    }
})

export default ViewPokemon