import React from 'react';

const ThemeContext = React.createContext('light');

const ThemeContextProvider =  ({children}) => {
    const [theme, setTheme] = React.useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => {
    return React.useContext(ThemeContext);
}

export default ThemeContextProvider;