import React, {useEffect, useState} from 'react';
import {globalStyles} from '../utils/globalStyles';
import {Platform, ScrollView, View} from 'react-native';
import {Text} from 'react-native-elements';
import {ScreenNavigationProps} from '../utils/constants';
import InputShared from '../components/Input';
import CheckBoxShared from '../components/CheckBox';
import ButtonShared from '../components/Button';
import {createUser} from '../utils/api/apiAccount';
import DialogShared from '../components/Dialog';
import {LoginInterface} from '../models/LoginInterface';

const RegisterScreen: React.FC<ScreenNavigationProps<'Register'>> = ({
  navigation,
}) => {
  // const [validationField, setValidationField] = useState(''); //TODO INTEGRAR CAMPO
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [check1, setCheck1] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleCloseDialog = () => {
    setDialogVisible(false);
  };
  // const handleValidationField = (field: any) => {
  //   setValidationField(field);
  // };
  const handleEmailChange = (newEmail: any) => {
    setEmail(newEmail);
  };
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };
  const handlePasswordVerificationChange = (
    newPasswordVerification: string,
  ) => {
    setPasswordVerification(newPasswordVerification);
  };
  const validatePasswords = (
    newPassword: string,
    newPasswordVerification: string,
  ) => {
    if (
      newPassword &&
      newPasswordVerification &&
      newPassword !== newPasswordVerification
    ) {
      setErrorMessage('Las contraseñas no coinciden.');
    } else {
      setErrorMessage('');
    }
  };
  const handleLoginSubmit = async () => {
    if (!email) {
      setDialogTitle('El correo electrónico no puede estar vacío.');
      setDialogText('');
      setDialogVisible(true);
      return;
    }
    if (!password) {
      setDialogTitle('La contraseña no puede estar vacía.');
      setDialogText('');
      setDialogVisible(true);
      return;
    }
    if (!passwordVerification) {
      setDialogTitle('La verificación de contraseña no puede estar vacía.');
      setDialogText('');
      setDialogVisible(true);
      return;
    }
    if (!check1) {
      setDialogTitle(
        'Debes aceptar los términos y condiciones para crear la cuenta.',
      );
      setDialogText('');
      setDialogVisible(true);
      return;
    }
    try {
      const userCreated = await createUser(
        email,
        password,
        passwordVerification,
      );
      navigation.navigate('Profiling', {
        accountId: (userCreated as LoginInterface).accountId,
      });
      return;
    } catch (error) {
      if (typeof error === 'string') {
        setDialogTitle(error);
      } else if (error instanceof Error) {
        setDialogTitle(error.message);
      } else {
        setDialogTitle('Ocurrió un error desconocido.');
      }
      setDialogText('');
      setDialogVisible(true);
      return;
    }
  };
  const validatePasswordStrength = (passwordToBeVerified: string) => {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[^A-Za-z0-9]/;
    const minLength = 8;
    const hasUppercase = uppercaseRegex.test(passwordToBeVerified);
    const hasNumber = numberRegex.test(passwordToBeVerified);
    const hasSpecialChar = specialCharRegex.test(passwordToBeVerified);
    const hasMinLength =
      passwordToBeVerified.length >= minLength ? true : false;
    const criteriaMet = {
      uppercase: hasUppercase,
      number: hasNumber,
      specialChar: hasSpecialChar,
      minLength: hasMinLength,
    };
    return criteriaMet;
  };

  useEffect(() => {
    if (password.length > 1) {
      const criteriaMet = validatePasswordStrength(password);
      if (!criteriaMet.uppercase) {
        setErrorMessage(
          'La contraseña debe incluir al menos una letra mayúscula.',
        );
      } else if (!criteriaMet.minLength) {
        setErrorMessage('La contraseña debe tener un mínimo de 8 caracteres.');
      } else if (!criteriaMet.number) {
        setErrorMessage('La contraseña debe incluir al menos un número.');
      } else if (!criteriaMet.specialChar) {
        setErrorMessage(
          'La contraseña debe incluir al menos un carácter especial.',
        );
      } else {
        validatePasswords(password, passwordVerification);
      }
    } else {
      setErrorMessage('');
    }
  }, [password, passwordVerification]);

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
            <Text style={globalStyles.boldInputText} h2={true}>
              Entrar
            </Text>
            <View style={globalStyles.row}>
              <View style={globalStyles.column}>
                <Text style={globalStyles.grayText}>
                  Crea tu cuenta para continuar
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={globalStyles.row} />
        {/* <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <InputShared
              onChangeText={handleValidationField}
              text="Dato de validación"
              placeholder="Dato de validación"
            />
          </View>
        </View> */}
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <InputShared
              onChangeText={handleEmailChange}
              text="Correo electrónico"
              placeholder="Correo electrónico"
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <InputShared
              errorMessage={errorMessage}
              onChangeText={handlePasswordChange}
              text="Contraseña"
              placeholder="Contraseña"
              isPassword={true}
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <InputShared
              onChangeText={handlePasswordVerificationChange}
              placeholder="Confirma la contraseña"
              isPassword={true}
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={[globalStyles.alignLeft]}>
            <CheckBoxShared
              onPress={() => setCheck1(!check1)}
              title={
                <Text>
                  He leído y estoy de acuerdo con los{' '}
                  <Text
                    style={[
                      globalStyles.lightedColor,
                      globalStyles.boldInputText,
                    ]}>
                    Términos y Condiciones
                  </Text>{' '}
                  las{' '}
                  <Text
                    style={[
                      globalStyles.lightedColor,
                      globalStyles.boldInputText,
                    ]}>
                    Políticas de Privacidad
                  </Text>
                  .
                </Text>
              }
              checkedTitle="Aceptado"
              checked={check1}
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <ButtonShared title={'Registrar'} onPress={handleLoginSubmit} />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={[globalStyles.column, globalStyles.alignCenter]}>
            <Text>
              ¿Tienes cuenta?
              <Text> </Text>
              <Text
                style={[globalStyles.lightedColor, globalStyles.boldInputText]}>
                Inicia sesión.
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={globalStyles.container}>
        <DialogShared
          text={dialogText}
          title={dialogTitle}
          visible={dialogVisible}
          onClose={handleCloseDialog}
        />
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
