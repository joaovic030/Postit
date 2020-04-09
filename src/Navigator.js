import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

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

const App = createStackNavigator({
  Feed,
  AddPost,
}, {
  initialRouteName: 'Feed'
});

const mainRoutes = {
  Splash: {
    name: 'Splash',
    screen: Splash
  },
  Login: {
    name: 'Login',
    screen: Login
  },
  App: {
    name: 'App',
    screen: App
  }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Splash'
})

export default createAppContainer(mainNavigator)
