import React from 'react';
import {ButtonProps, ViewStyle} from 'react-native';
import {Button} from 'react-native-elements';
import {globalStyles} from '../utils/globalStyles';

interface BtnProps extends ButtonProps {
  title: string;
  buttonColor?: string;
  buttonStyle?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
}

const ButtonShared: React.FC<BtnProps> = ({title, onPress, disabled}) => {
  return (
    <Button
      disabled={disabled}
      title={title}
      onPress={onPress}
      buttonStyle={globalStyles.mainButton}
      titleStyle={globalStyles.textMainButton}
    />
  );
};

export default ButtonShared;
