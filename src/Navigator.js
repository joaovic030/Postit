import React from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome'

import Login from './screens/Login'
import Splash from './screens/Splash'
import Feed from './screens/Feed'
import AddPost from './screens/AddPost'

// const SplashRouter = createSwitchNavigator({
//   Splash: Splash,
//   Login: Login,
// }, {
//   initialRouteName: 'Splash'
// })


const mainRoutes = {
  Splash: {
    name: 'Splash',
    screen: Splash
  },
  Login: {
    name: 'Login',
    screen: Login
  },
  Feed: {
    name: 'Feed',
    screen: Feed
  },
  AddPost: {
    name: 'AddPost',
    screen: AddPost
  }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Splash'
})

export default createAppContainer(mainNavigator)
