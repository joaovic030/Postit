import React, { Component } from 'react'
import { View,
  Text,
  StyleSheet,
  Image } from 'react-native'
import Pattern from '../styles/Pattern'


export default class Splash extends Component {
  state = {
    captionVisible: false
  }
  
  componentDidMount = () => {
    setTimeout(
      () => {
        this.props.navigation.navigate('Login')
      }, 2000
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageBox}>
          <Image source={require('../../assets/imgs/Logo.png')} style={styles.image} />
        </View>
        <View style={styles.footer}>
            <View style={styles.profile}>
                <Image source={require('../../assets/imgs/smileJoao.jpg')} style={styles.photo} />
                <Text style={styles.caption}> João Rocha </Text>
            </View>
            <Text style={styles.caption}> joao@joaovrocha.com </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#283CA1'
  },
  imageBox: {
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 2
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    backgroundColor: '#283CA1'
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: Pattern.fontFamily,
    color: Pattern.colors.light
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'center'
  },
  photo: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})