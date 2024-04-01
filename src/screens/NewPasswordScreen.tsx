import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-elements';
import {ScreenNavigationProps} from '../utils/constants';
import {ScrollView, View, Platform} from 'react-native';
import {globalStyles} from '../utils/globalStyles';
import InputShared from '../components/Input';
import ButtonShared from '../components/Button';
import {changePassword} from '../utils/api/apiAccount';

const NewPasswordScreen: React.FC<ScreenNavigationProps<'NewPassword'>> = ({
  navigation,
  route,
}) => {
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmitChange = async () => {
    try {
      const changedUser = await changePassword(
        route.params.accountId as number,
        password,
      );
      if ('accountId' in changedUser) {
        navigation.navigate('Login');
      } else {
        setErrorMessage('No se ha podido cambiar la contraseña.');
      }
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
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };
  const handlePasswordVerificationChange = (
    newPasswordVerification: string,
  ) => {
    setPasswordVerification(newPasswordVerification);
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
              Nueva contraseña
            </Text>
          </View>
        </View>
        <View style={globalStyles.marginVertical2} />
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <InputShared
              errorMessage={errorMessage}
              onChangeText={handlePasswordChange}
              text="Nueva contraseña"
              placeholder="Contraseña"
              isPassword={true}
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <InputShared
              onChangeText={handlePasswordVerificationChange}
              text="Reescriba la contraseña"
              placeholder="Confirma la contraseña"
              isPassword={true}
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <ButtonShared title={'Aceptar'} onPress={handleSubmitChange} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewPasswordScreen;
