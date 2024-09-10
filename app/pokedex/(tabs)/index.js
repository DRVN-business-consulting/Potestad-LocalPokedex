import { View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from '../components/pokemon';
import { API_URL } from '../../constants';
import { useTheme } from '../../../src/context/ThemeContext';
import { colors, themeColors } from '../../themes/colors';
import { myTheme } from '../../themes/myTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PokemonListScreen = () => { 
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(true); 
    const [pokemons, setPokemons] = useState([]); 

    const fetchPokemons = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/pokemon`);
            await AsyncStorage.setItem('pokemons', JSON.stringify(data));
            setPokemons(data);
        } catch (error) {
            console.error("Failed to fetch pokemons", error);
        } finally {
            setIsLoading(false);
        }
    };

    // const fetchPokemons = async () => {
    //     try {
    //         const { data } = await axios.get(`${API_URL}/pokemon`);
            
    //         console.log(data);
    //         const pokemonImages = data.map(pokemon => ({
    //             id: pokemon.id,
    //             // image: pokemon.sprites.front_default
    //         }));
            
    //         await AsyncStorage.setItem('pokemonImages', JSON.stringify(pokemonImages));
    //         await AsyncStorage.setItem('pokemons', JSON.stringify(data));
    //         setPokemons(data);
    //     } catch (error) {
    //         console.error("Failed to fetch pokemons", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    

    const getPokemonsFromStorage = async () => {
        try {
            const storedPokemons = await AsyncStorage.getItem('pokemons');
            if (storedPokemons !== null) {
                setPokemons(JSON.parse(storedPokemons));
                setIsLoading(false);
            } else {
                fetchPokemons();
            }
        } catch (error) {
            console.error("Failed to retrieve pokemons from storage", error);
            fetchPokemons(); 
        }
    };

    useEffect(() => {
        getPokemonsFromStorage(); 
    }, []);
    
    const themeColor = themeColors[theme];
    
    if (isLoading) {
        return (
            <View style={myTheme.centerInContainer}>
                <ActivityIndicator color={colors.red_500} />
            </View>
        );
    }
    
    return (
        <SafeAreaView style={{flex:1}}>
            <FlatList
                style={[myTheme.container , {backgroundColor: themeColor.container}]}
                data={pokemons}
                renderItem={({ item }) => (
                    <View style={myTheme.pokemonCardContainer}>
                        <PokemonCard pokemon={item} />
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
};

export default PokemonListScreen;

