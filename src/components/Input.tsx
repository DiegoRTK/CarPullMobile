import React, {useState} from 'react';
import {KeyboardTypeOptions, View} from 'react-native';
import {Icon, Input, Text} from 'react-native-elements';
import {globalStyles} from '../utils/globalStyles';
import CountryPicker from 'react-native-country-picker-modal';

interface InputProps {
  placeholder: string;
  text?: string;
  isPassword?: boolean;
  icon?: string;
  onChangeText?: (text: string) => void;
  errorMessage?: string;
  isNumber?: boolean;
  value?: any;
  inputType?: KeyboardTypeOptions;
}
const InputShared: React.FC<InputProps> = ({
  placeholder,
  text = '',
  isPassword = false,
  icon = '',
  onChangeText,
  errorMessage,
  isNumber = false,
  value = '',
  inputType = 'default',
}) => {
  const [password, setPassword] = useState(true);

  const toggleShowPassword = () => {
    setPassword(!password);
  };
  const inputProps = value ? {value} : null;

  return (
    <View>
      {text ? <Text style={globalStyles.boldInputText}>{text}</Text> : null}
      <View style={globalStyles.row}>
        {isNumber ? (
          <CountryPicker
            withFlag
            withCallingCode
            withFilter
            withEmoji
            withCallingCodeButton
            visible={false}
            countryCode={'ES'}
            containerButtonStyle={[
              globalStyles.col2,
              globalStyles.alignCountryPicker,
            ]}
          />
        ) : null}
        {isNumber ? (
          <Input
            style={globalStyles.sharedInput}
            placeholder={placeholder}
            placeholderTextColor="lightgray"
            keyboardType="phone-pad"
            errorMessage={errorMessage ? errorMessage : undefined}
            onChangeText={onChangeText}
            containerStyle={globalStyles.column}
            {...inputProps}
          />
        ) : (
          <Input
            keyboardType={inputType}
            onChangeText={onChangeText}
            inputContainerStyle={globalStyles.removeUnderline}
            style={globalStyles.sharedInput}
            placeholder={placeholder}
            placeholderTextColor="lightgray"
            secureTextEntry={isPassword && password}
            errorMessage={errorMessage ? errorMessage : undefined}
            rightIcon={
              isPassword ? (
                <Icon
                  name={password ? 'visibility-off' : 'visibility'}
                  size={20}
                  onPress={toggleShowPassword}
                />
              ) : icon ? (
                <Icon name={icon} size={20} />
              ) : undefined
            }
            {...inputProps}
          />
        )}
      </View>
    </View>
  );
};

export default InputShared;
