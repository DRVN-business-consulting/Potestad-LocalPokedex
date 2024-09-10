// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { router } from 'expo-router'
// import { API_URL } from '../../constants'
// import { myTheme } from '../../themes/myTheme'
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Pokemon = ({ pokemon: { id, name, type, image }}) => {

//   return (
//     <>
//       <TouchableOpacity style={[myTheme.row, styles.container]} onPress={() => router.push(`pokedex/${id}`)}>
//         <Image source={{ uri: `${API_URL + image.thumbnail}`}} style={{ width: 80, height: 80}} />
//         <View>
//           <Text style={styles.name}>{name.english}</Text>
//           <Text>{type}</Text>
//         </View>
//       </TouchableOpacity>
//       <View style={{flexDirection: 'row', padding: 10, justifyContent:'space-between', marginHorizontal: 110}}>
//         <TouchableOpacity style={{marginRight: 2}}>
//           <FontAwesome6 
//             name="cart-plus" 
//             size={24} 
//             color='green'
//           />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <FontAwesome6 
//             name="pen-to-square" 
//             size={24} 
//             color='blue'
//           />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() =>}>
//           <FontAwesome6 
//             name="trash" 
//             size={24} 
//             color='red'
//           />
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     gap: 20,
//     marginHorizontal: 40,
//     marginVertical: 15,
//   },
//   name: {
//     fontSize: 25,
//     fontWeight: 'bold',
//   },
// });

// export default Pokemon;
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { API_URL } from '../../constants';
import { myTheme } from '../../themes/myTheme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pokemon = ({ pokemon: { id, name, type, image }, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      const storedPokemons = await AsyncStorage.getItem('pokemons');
      if(storedPokemons){
        const storedPokemonsList = JSON.parse(storedPokemons);
      }
    } catch (error) {
      console.error("Failed to delete the pokemon", error);
    }
  };

  return (
    <>
      <TouchableOpacity style={[myTheme.row, styles.container]} onPress={() => router.push(`pokedex/${id}`)}>
        <Image source={{ uri: `${API_URL + image.thumbnail}`}} style={{ width: 80, height: 80}} />
        <View>
          <Text style={styles.name}>{name.english}</Text>
          <Text>{type}</Text>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', marginHorizontal: 110 }}>
        {/* <TouchableOpacity style={{ marginRight: 2 }}>
          <FontAwesome6 name="cart-plus" size={24} color='green' />
        </TouchableOpacity> */}
        <TouchableOpacity>
          <FontAwesome6 name="pen-to-square" size={24} color='blue' />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{handleDelete(id)}}>
          <FontAwesome6 name="trash" size={24} color='red' />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
    marginHorizontal: 40,
    marginVertical: 15,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Pokemon;
