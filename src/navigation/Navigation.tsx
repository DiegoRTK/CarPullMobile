import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfilingScreen from '../screens/ProfilingScreen';
import TravelsScreen from '../screens/TravelsScreen';
import ForgotPasswordCodeScreen from '../screens/ForgotPasswordCodeScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import DriverRegisterHomeScreen from '../screens/DriverRegisterHomeScreen';
import PickupPointScreen from '../screens/PickupPointScreen';
import CarRegisterScreen from '../screens/CarRegisterScreen';
import ScheduleScreen from '../screens/ScheduleScreen';

type Props = {};

const Stack = createStackNavigator();

const Navigation: React.FC<Props> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen as never}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen as never}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen as never}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profiling"
          component={ProfilingScreen as never}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Travels"
          component={TravelsScreen as never}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordCodeScreen as never}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPasswordScreen as never}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DriverRegisterHome"
          component={DriverRegisterHomeScreen as never}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PickupPoint"
          component={PickupPointScreen as never}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Schedule"
          component={ScheduleScreen as never}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CarRegister"
          component={CarRegisterScreen as never}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
