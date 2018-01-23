import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import GoogleMapsExampleScreen from '../Containers/GoogleMapsExample.Screen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  GoogleMapsExampleScreen: { screen: GoogleMapsExampleScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'GoogleMapsExampleScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
