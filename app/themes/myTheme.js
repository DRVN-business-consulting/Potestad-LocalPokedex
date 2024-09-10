import { StyleSheet } from "react-native";

export const myTheme = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        display: 'flex',  
        flexDirection: 'row',
    },
    column: {
        display: 'flex',  
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerAll: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    w_100: {
        width: '100%'
    },
    textWhite: {
        color: '#FFFFFF'
    },
    centerInContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pokemonCardContainer: {
        borderRadius: 8,
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
});