import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Category from './screens/Category';
import Account from './screens/Account';
import ShoppingCart from './screens/ShoppingCart';

const Tap = createBottomTabNavigator();

export default function App() {

  const [loaded] = useFonts({
    InterBold: require('./assets/fonts/Inter-Bold.ttf'),
    InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
    InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
    InterLight: require('./assets/fonts/Inter-Light.ttf'),
  })

  if(!loaded) return null;
  return (
    <NavigationContainer>
      <Tap.Navigator initialRouteName='Home' screenOptions={
          { 
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: 'rgba(0, 0, 0, 0.3)',
            tabBarInactiveBackgroundColor: 'rgba(205, 194, 194, 0.52)',
          }
        }>
        <Tap.Screen name='Home' component={Home} options={{tabBarIcon: ({focused, size, color}) => {
            return (
              <FontAwesome
                name='home'
                size={32}
              />
            )
        }}}/>
        <Tap.Screen name='Category' component={Category} options={{tabBarIcon: ({focused, size, color}) => {
          return (
            <FontAwesome
            name='list'
            size={32}/>
          )
        }}}/>
        <Tap.Screen name='Корзина' component={ShoppingCart} options={{tabBarIcon: ({focused, size, color}) => {
          return (
            <FontAwesome
            name='shopping-cart'
            size={32}/>
          )
        }}}/>
        <Tap.Screen name='user' component={Account} options={{tabBarIcon: ({focuse, size, color}) => {
          return (
            <FontAwesome
            name='user'
            size={32}/>
          )
        }}}/>
      </Tap.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
