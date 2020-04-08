import React from 'react'
import { View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image
    } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Pattern from '../styles/Pattern'

export default props => {
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
              Post.its
            </Text>
            <Text style={styles.email}>
              {props.email}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: Platform.OS === 'android' ? 46 : '87pts',
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 44 : 0,
        backgroundColor: Pattern.colors.light,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5
    },
    title: {
        fontSize: 20,
        fontFamily: Pattern.fontFamily,
        fontWeight: 'bold',
        color: Pattern.colors.primary,
        marginLeft: 20
    },
    email: {
      fontSize: 12,
      fontFamily: Pattern.fontFamily,
      color: Pattern.colors.textDark,
      marginRight: 10
    }
})
