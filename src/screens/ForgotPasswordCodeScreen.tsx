import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {Text} from 'react-native-elements';
import {ScreenNavigationProps} from '../utils/constants';
import {ScrollView} from 'react-native-gesture-handler';
import {View, Platform, TextInput} from 'react-native';
import {globalStyles} from '../utils/globalStyles';
import DialogShared, {DialogType} from '../components/Dialog';
import {submitCode, validateCode} from '../utils/api/apiAccount';
import ButtonShared from '../components/Button';
import InputShared from '../components/Input';
import {UserInterface} from '../models/User';

const ForgotPasswordCodeScreen: React.FC<
  ScreenNavigationProps<'ForgotPassword'>
> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [accountId, setAccountId] = useState<number | null>(null);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState<ReactNode | string>(null);
  const [isSendingMail, setIsSendingMail] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>('error');
  const [errorMessage, setErrorMessage] = useState('');
  const [code, setCode] = useState<string>('');
  const inputRefs = useRef<(TextInput | null)[]>(Array(5).fill(null));

  const handleChangeText = (value: string, index: number) => {
    setCode(prevCode => {
      const newCode = prevCode.split('');
      newCode[index] = value;
      return newCode.join('');
    });
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: {nativeEvent: {key: any}; target: any}) => {
    const key = event.nativeEvent.key;
    const target = event.target;
    if (key === 'Backspace' && !target.value) {
      const index = inputRefs.current.findIndex(input => input === target);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        setCode(
          prevCode => prevCode.slice(0, index - 1) + prevCode.slice(index),
        );
      }
    }
  };

  const renderInputs = () => {
    return Array.from({length: 5}, (_, i) => (
      <TextInput
        key={i}
        ref={ref => (inputRefs.current[i] = ref)}
        style={[globalStyles.input, i === 0 && globalStyles.firstInput]}
        value={code[i] ?? ''}
        maxLength={1}
        autoCorrect={true}
        keyboardType="numeric"
        onChangeText={value => handleChangeText(value, i)}
        onKeyPress={handleKeyPress}
      />
    ));
  };
  const handleCloseDialog = () => {
    setIsSendingMail(false);
    setDialogVisible(false);
  };
  const handleCloseDialogMail = () => {
    setDialogVisible(false);
    isSendingMail ? navigation.navigate('Login') : null;
  };
  const handleSubmitCode = async () => {
    try {
      const res = await submitCode(email);
      setAccountId((res as UserInterface).accountId);
      setIsSendingMail(false);
      setDialogVisible(true);
      setDialogType('check');
      setDialogTitle('¡Envío exitoso!');
      setDialogText(
        'Se ha enviado un correo con el código de verificación válido por 30 minutos.',
      );
      setErrorMessage('');
    } catch (error) {
      if (typeof error === 'string') {
        setErrorMessage(error);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocurrió un error desconocido.');
      }
      return;
    }
  };
  const handleValidateCode = async () => {
    try {
      const res = (await validateCode(
        code,
        accountId as number,
      )) as unknown as {
        validated: boolean;
      };
      if (res.validated) {
        navigation.navigate('NewPassword', {accountId: accountId as number});
      } else {
        setErrorMessage('Código incorrecto.');
        setDialogType('error');
        setDialogText('Por favor, inténtelo nuevamente.');
        setDialogTitle('Código incorrecto.');
      }
    } catch (error) {
      setDialogType('error');
      setDialogVisible(true);
      if (typeof error === 'string') {
        setDialogTitle('!Error!');
        setDialogText(error);
        setErrorMessage(error);
      } else if (error instanceof Error) {
        setDialogTitle('!Error!');
        setDialogText(error.message);
        setErrorMessage(error.message);
      } else {
        setDialogTitle('!Error!');
        setDialogText('Ocurrió un error desconocido.');
        setErrorMessage('Ocurrió un error desconocido.');
      }
      return;
    } finally {
      handleCloseDialog();
    }
  };
  useEffect(() => {
    setIsSendingMail(true);
    setDialogVisible(true);
  }, []);
  if (isSendingMail) {
    return (
      <View style={globalStyles.container}>
        <DialogShared
          text={
            <View>
              <InputShared
                placeholder="Correo electrónico"
                icon="mail"
                onChangeText={(mail: string) => setEmail(mail)}
                errorMessage={errorMessage}
              />
            </View>
          }
          title={'Ingresa un correo existente.'}
          showButton={true}
          showCancelButton={true}
          visible={isSendingMail ? true : false}
          onClose={handleCloseDialogMail}
          onSubmit={handleSubmitCode}
          type={'question'}
          isElement={true}
          okButtonTitle="Enviar código"
        />
      </View>
    );
  }
  if (dialogVisible) {
    return (
      <View style={globalStyles.container}>
        <DialogShared
          text={dialogText}
          title={dialogTitle}
          showButton={false}
          showCancelButton={false}
          visible={dialogVisible}
          onClose={handleCloseDialog}
          type={dialogType}
          isElement={false}
        />
      </View>
    );
  }
  return (
    <ScrollView>
      <View
        style={
          Platform.OS === 'android'
            ? globalStyles.container
            : globalStyles.containerOS
        }>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <Text
              style={(globalStyles.boldInputText, globalStyles.centeredTitle)}
              h2={true}>
              Recuperar contraseña
            </Text>
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <Text>
              Ingresa el código de verificación que se ha enviado al correo:{' '}
              {email}
            </Text>
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <View style={globalStyles.inputContainer}>{renderInputs()}</View>
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <Text style={globalStyles.errorColor}>{errorMessage}</Text>
          </View>
        </View>
        <View style={globalStyles.row} />
        <View style={globalStyles.row}>
          <View style={globalStyles.col6} />
          <View style={globalStyles.col6}>
            <ButtonShared onPress={handleValidateCode} title="Siguiente" />
          </View>
          <View style={globalStyles.col6} />
        </View>
      </View>
    </ScrollView>
  );
};
export default ForgotPasswordCodeScreen;
