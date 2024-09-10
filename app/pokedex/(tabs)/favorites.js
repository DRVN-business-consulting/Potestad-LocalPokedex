import { View, Text, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { useFavorites } from '../../../src/context/FavoriteThemeContext'
import Pokemon from '../components/pokemon'
import { myTheme } from '../../themes/myTheme'
import { useTheme } from '../../../src/context/ThemeContext'
import { themeColors } from '../../themes/colors'

const FavoriteScreen = () => {
  const { theme } = useTheme()
  const { favorite } = useFavorites()

  const themeColor = themeColors[theme];
  if(favorite.length == 0){
    return (
    <View style={[myTheme.centerInContainer, {backgroundColor: themeColor.container}]}>
        <Text style={[{color: themeColor.textColor, fontSize: 20}]}>You haven't added any favorites yet.</Text>
    </View>)
  }
  return (
    <SafeAreaView style={[{ flex: 1}]}>
      <FlatList 
        data={favorite} 
        style={[{backgroundColor: themeColor.container, paddingVertical: 20}]}
        renderItem={({ item }) => <Pokemon  pokemon={item}/>}  />
    </SafeAreaView>
  )
}


export default FavoriteScreen