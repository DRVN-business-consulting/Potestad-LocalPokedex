import { Tabs } from "expo-router";
export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen 
                name='index' 
                options={
                    { 
                        title: 'Pokemon List',
                        headerShown: true,
                    }
                }    
            />
            <Tabs.Screen 
                name='favorites'  
                options={
                    { 
                        title: 'Favorites',
                        headerShown: true,
                    }
                } />
            <Tabs.Screen 
                name='settings'
                options={
                    { 
                        title: 'App Settings',
                        headerShown: true,
                    }
                }   
            />
        </Tabs>
    );
}