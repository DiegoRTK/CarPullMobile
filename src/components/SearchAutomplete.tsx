import {
  AutocompleteDropdown,
  AutocompleteDropdownProps,
} from 'react-native-autocomplete-dropdown';
import {Text, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../utils/globalStyles';

interface SearchBarProps extends AutocompleteDropdownProps {
  title: string;
  placeholder: string;
}

const SearchBarShared: React.FC<SearchBarProps> = ({
  title,
  onChangeText,
  clearOnFocus,
  closeOnBlur,
  closeOnSubmit,
  debounce,
  dataSet,
  placeholder,
  onBlur,
  onSelectItem,
  onClear,
}) => {
  return (
    <View>
      <Text style={[globalStyles.boldInputText, globalStyles.row]}>
        {title}
      </Text>
      <AutocompleteDropdown
        useFilter={false}
        onClear={onClear}
        onSelectItem={onSelectItem}
        clearOnFocus={clearOnFocus}
        closeOnBlur={closeOnBlur}
        closeOnSubmit={closeOnSubmit}
        onChangeText={onChangeText}
        debounce={debounce}
        dataSet={dataSet}
        textInputProps={{
          placeholder: placeholder,
        }}
        onBlur={onBlur}
        inputContainerStyle={globalStyles.inputStyle}
        EmptyResultComponent={
          <Text
            style={[
              globalStyles.boldInputText,
              globalStyles.centerBody,
              globalStyles.padding,
            ]}>
            No se ha encontrado información ¯\_(ツ)_/¯
          </Text>
        }
      />
    </View>
  );
};

export default SearchBarShared;
