import React from 'react';
import {Dialog, Icon, Text} from 'react-native-elements';
import {globalStyles} from '../utils/globalStyles';
import {errorColor, mainColor, successColor} from '../utils/constants';
import {View} from 'react-native';

// Define un tipo para los diferentes tipos de diálogo
export type DialogType = 'error' | 'check' | 'question';

// Define un tipo para los objetos de los tipos de diálogo
interface DialogTypeInfo {
  name: string;
  color: string;
}

// Define un objeto con la información de cada tipo de diálogo
const dialogTypes: Record<DialogType, DialogTypeInfo> = {
  error: {
    name: 'cancel',
    color: errorColor,
  },
  check: {
    name: 'check',
    color: successColor,
  },
  question: {
    name: 'mail',
    color: mainColor,
  },
};

interface DialogProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSubmit?: () => void;
  type?: DialogType; // Usar el tipo DialogType en lugar de string
  showButton?: boolean;
  showCancelButton?: boolean;
  isElement?: boolean;
  okButtonTitle?: string;
  text?: string | React.ReactNode;
}

const DialogShared: React.FC<DialogProps> = ({
  title,
  visible,
  text,
  onClose,
  type = 'error', // Asignar un valor por defecto que coincida con un tipo de diálogo existente
  showButton = false,
  showCancelButton = false,
  okButtonTitle = 'Aceptar',
  onSubmit = () => {},
  isElement = false,
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Dialog isVisible={visible} onBackdropPress={handleClose}>
      <Icon
        name={dialogTypes[type].name}
        color={dialogTypes[type].color}
        size={100}
      />
      <Dialog.Title title={title} titleStyle={globalStyles.centeredTitle} />
      {isElement ? (
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>{text}</View>
        </View>
      ) : (
        <Text>{text}</Text>
      )}
      <View style={globalStyles.row}>
        <View style={globalStyles.col6} />
        {showCancelButton && (
          <Dialog.Button title="Cancelar" onPress={handleClose} />
        )}
        {showButton && (
          <Dialog.Button title={okButtonTitle} onPress={handleSubmit} />
        )}
        <View style={globalStyles.col6} />
      </View>
    </Dialog>
  );
};

export default DialogShared;
