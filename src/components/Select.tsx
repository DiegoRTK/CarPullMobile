import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {globalStyles} from '../utils/globalStyles';
import {StyleProp, Text, TextStyle, View, ViewStyle} from 'react-native';
import {mainFocusedColor} from '../utils/constants';

interface SelectProps {
  data: Array<Record<string, string>>;
  onChange: (value: any) => void;
  value?: Record<string, string> | string;
  placeholder?: string;
  labelField?: string;
  valueField?: string;
  style?: StyleProp<ViewStyle>;
  search?: boolean;
  placeholderStyle?: StyleProp<TextStyle>;
  title?: string;
}

const DropdownComponent: React.FC<SelectProps> = ({
  data,
  labelField = 'label',
  valueField = 'value',
  placeholder = 'Selecciona un ítem',
  onChange,
  value = '',
  style = globalStyles.dropdown,
  search = true,
  placeholderStyle = globalStyles.placeholderStyle,
  title,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[globalStyles.label, isFocus && {color: mainFocusedColor}]}>
          Seleccionar modo
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={globalStyles.containerSelect}>
      {renderLabel()}
      <View>
        <Dropdown
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value}
          style={style}
          placeholderStyle={placeholderStyle}
          selectedTextStyle={globalStyles.selectedTextStyle}
          inputSearchStyle={globalStyles.inputSearchStyle}
          iconStyle={globalStyles.iconStyle}
          data={data}
          search={search}
          maxHeight={300}
          labelField={labelField}
          valueField={valueField}
          placeholder={placeholder}
          searchPlaceholder="Busca un ítem..."
          onChange={onChange}
        />
      </View>
    </View>
  );
};

export default DropdownComponent;
