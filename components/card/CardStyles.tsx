import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    valuesContainer: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    subContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    valueTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
    },
});