import React, { Component } from 'react'
import { View,
  Text,
  StyleSheet, 
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
  Image,
  Platform,
  } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Pattern from '../styles/Pattern'
import AsyncStorage from '@react-native-community/async-storage'

class Login extends Component {

  state = {
    email: '',
    password: '',
    nome: '',
    subscribe: false
  }

  signinOrSignup = () => {
      if(this.state.subscribe) {
        this.signup()
      } else {
        this.signin()
      }
  }
  signin = () => {
    const res = JSON.stringify(this.state)
    AsyncStorage.setItem('userData', res)
    this.props.navigation.navigate('Feed')
  }
  signup = () => {
    this.props.navigation.navigate('Feed')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <View style={styles.sloganLogo}>
            <Image source={require('../../assets/imgs/LogoBlue.png')} style={styles.image} />
          </View>

          {this.state.subscribe ? <View style={styles.SectionStyle}>
              <Icon name='at' color='#000' size={20} style={styles.IconUser} />
              <TextInput style={styles.input} placeholder="Nome" placeholderTextColor='#000' value={this.state.email} onChangeText={nome => this.setState({ nome })} />
          </View> : null}
          <View style={styles.SectionStyle}>
              <Icon name='at' color='#000' size={20} style={styles.IconUser} />
              <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor='#000' value={this.state.email} onChangeText={email => this.setState({ email })} type='email' />
          </View>
          <View style={styles.SectionStyle}>
              <Icon name='key' color='#000' size={20} style={styles.IconUser} />
              <TextInput style={styles.input} placeholder="Senha" placeholderTextColor='#000' value={this.state.password} onChangeText={password => this.setState({ password })} secureTextEntry={true} />
          </View>

          <TouchableOpacity style={styles.buttonLogin} activeOpacity={0.9} onPress={() => this.signinOrSignup() }>
              <Text style={styles.textButton}>
              {this.state.subscribe ? 'Cadastrar' : 'Entrar'}
              </Text>
          </TouchableOpacity>

          <TouchableHighlight style={{ marginTop: 10 }} onPress={() => this.setState({ subscribe: !this.state.subscribe })}>
              <Text style={styles.hint}>
                  {this.state.subscribe ? 'Já possui conta?' : 'Não possui cadastro?'} 
              </Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#283CA1'
  },
  loginBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 20
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderWidth: 0.5,
    borderColor: '#333',
    backgroundColor: '#DDD',
    borderRadius: 20,
    height: 40,
    marginTop: 20,
  },

  IconUser: {
    padding: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1, 
    color: '#000'
  },
  inputForDate: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#bbb',
  },
  sloganLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    // marginBottom: 20,
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  buttonLogin: {
    width: '90%',
    borderRadius: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Pattern.colors.primary,
    marginTop: 20,
  },
  textButton: {
    color: Pattern.colors.light,
    fontFamily: Pattern.fontFamily,
  },
  hint: {
    color: Pattern.colors.textDark,
    fontFamily: Pattern.fontFamily,
    fontWeight: 'bold'
  }
});


export default Login