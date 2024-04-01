import React, {useEffect} from 'react';
import {View, Image, ImageSourcePropType, Platform} from 'react-native';
import {ScreenNavigationProps} from '../utils/constants';
import {globalStyles} from '../utils/globalStyles';

const HomeScreen: React.FC<ScreenNavigationProps<'Home'>> = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, Math.ceil(Math.random() * (2500 - 1000) + 1000));
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={
        Platform.OS === 'android'
          ? globalStyles.container
          : globalStyles.containerOS
      }>
      <Image
        source={require('../assets/car.gif') as ImageSourcePropType}
        resizeMode="cover"
      />
    </View>
  );
};

export default HomeScreen;
