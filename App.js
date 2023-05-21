import { StyleSheet, Text, View, Dimensions } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Home from './screens/Home/Home'
import Category from './screens/category/Category';
import Account from './screens/user/Account';
import ShoppingCart from './screens/cart/ShoppingCart';

const {width} = Dimensions.get("window");
console.log("Width: " + width);

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
            tabBarActiveBackgroundColor: width < 500 ? '#3b3c3d' : 'rgba(205, 194, 194, 0.52)',
            tabBarInactiveBackgroundColor: width < 500 ? '#3b3c3d' : 'rgba(205, 194, 194, 0.52)',
            tabBarActiveTintColor: '#0BB798',
            tabBarInactiveTintColor: '#f5f5f5',
          }
        }
        tabBarActiveTintColor = '#0BB798'>
        <Tap.Screen name='Home' component={Home} options={{tabBarIcon: ({focused, size, color}) => {
            return (
              <FontAwesome
                name='home'
                size={32}
                color={focused ? '#0BB798' : 'rgba(0, 0, 0, 0.9)'}
              />
            )
        }}}/>
        <Tap.Screen name='Category' component={Category} options={{tabBarIcon: ({focused, size, color}) => {
          return (
            <FontAwesome
            name='list'
            size={32}
            color={focused ? '#0BB798' : 'rgba(0, 0, 0, 0.9)'}/>
          )
        }}}/>
        <Tap.Screen name='Корзина' component={ShoppingCart} options={{tabBarIcon: ({focused, size, color}) => {
          return (
            <FontAwesome
            name='shopping-cart'
            size={32}
            color={focused ? '#0BB798' : 'rgba(0, 0, 0, 0.9)'}/>
          )
        }}}/>
        <Tap.Screen name='Account' component={Account} options={{tabBarIcon: ({focused, size, color}) => {
          return (
            <FontAwesome
            name='user'
            size={32}
            color={focused ? '#0BB798' : 'rgba(0, 0, 0, 0.9)'}/>
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
