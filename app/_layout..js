import { Stack } from 'expo-router'
import { colors, themeColors } from './themes/colors'
import ThemeContextProvider from '../src/context/ThemeContext'
import { FavoriteThemeContextProvider }  from '../src/context/FavoriteThemeContext'


const AppLayout = () => {
  return (
    <ThemeContextProvider>
        <FavoriteThemeContextProvider>
            <Stack>
                <Stack.Screen
                    name='index'
                    options={
                        {
                            headerShown: false
                        }
                    }
                />
                <Stack.Screen
                    name='pokedex/(tabs)'  
                    options={
                        {
                            headerShown: false,
                        }
                    } 
                />
                <Stack.Screen
                    name='pokedex/[id]'
                    options={
                        {
                            title: 'View Pokemon',
                           headerShown: true,
                        }
                    } 
                />
            </Stack>
        </FavoriteThemeContextProvider>
    </ThemeContextProvider>
  )
}

export default AppLayout