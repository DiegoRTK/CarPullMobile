import React from 'react';
import {CheckBox} from 'react-native-elements';
import {globalStyles} from '../utils/globalStyles';

interface CheckboxProps {
  title:
    | string
    | React.ReactElement<{}, string | React.JSXElementConstructor<any>>
    | undefined;
  checkedTitle?: string;
  checked: boolean;
  onPress?: () => void;
  roundedCheck?: boolean;
  iconRight?: boolean;
  inputStyled?: boolean;
}

const CheckBoxShared: React.FC<CheckboxProps> = ({
  title,
  checkedTitle = '',
  checked,
  onPress = () => {},
  roundedCheck = false,
  iconRight = false,
  inputStyled = false,
}) => {
  const commonProps = {
    title,
    containerStyle: inputStyled ? {} : globalStyles.backgroundTransparent,
    size: 30,
    checkedTitle: checkedTitle || undefined,
    checked,
    onIconPress: onPress,
    titleProps: {disabled: true},
    iconRight,
  };
  return !roundedCheck ? (
    <CheckBox {...commonProps} />
  ) : (
    <CheckBox
      {...commonProps}
      checkedIcon="check-circle"
      uncheckedIcon="circle-o"
    />
  );
};

export default CheckBoxShared;
