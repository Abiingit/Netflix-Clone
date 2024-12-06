import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './android/app/src/screens/HomeScreen';
import SearchScreen from './android/app/src/screens/SearchScreen';
import DetailsScreen from './android/app/src/screens/DetailsScreen';
import SplashScreen from './android/app/src/screens/SplashScreen';

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  Home: undefined;
  Search: undefined;
  Details: { movie: any };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// HomeStack
const HomeStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        title: 'Movie Details',
      }}
    />
  </Stack.Navigator>
);

// SearchStack
const SearchStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        title: 'Search Movies',
      }}
    />
  </Stack.Navigator>
);

// MainTabNavigator
const MainTabNavigator: React.FC = () => (
  <Tab.Navigator
    initialRouteName="HomeTab"
    screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#000', borderTopWidth: 0 },
      tabBarActiveTintColor: '#E50914',
      tabBarInactiveTintColor: '#fff',
    }}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeStack}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="SearchTab"
      component={SearchStack}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color, size }) => (
          <Icon name="search-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

// Main App component
const App: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
      {/* Splash Screen */}
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
