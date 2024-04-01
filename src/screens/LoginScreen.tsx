// HomeScreen.jsx
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {getOneById, loginUser} from '../utils/api/apiAccount';
import {Header, Text} from 'react-native-elements';
import {globalStyles} from '../utils/globalStyles';
import {ScreenNavigationProps, mainColor} from '../utils/constants';
import InputShared from '../components/Input';
import ButtonShared from '../components/Button';
import DialogShared from '../components/Dialog';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Platform} from 'react-native';
import {LoginInterface} from '../models/LoginInterface';
import {store} from '../../App';

const LoginScreen: React.FC<ScreenNavigationProps<'Login'>> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const handleCloseDialog = () => {
    setDialogVisible(false);
  };
  const handleEmailChange = (newEmail: any) => {
    setEmail(newEmail);
  };
  const handlePasswordChange = (newPassword: any) => {
    setPassword(newPassword);
  };
  const handleLoginButton = async () => {
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
    try {
      const userData = await loginUser(email, password);
      navigation.navigate('Travels', {
        accountId: (userData as LoginInterface).accountId,
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

  useEffect(() => {
    const verifyIfUserIsLoggedIn = async () => {
      const userData = store.getState();
      if ('auth' in userData) {
        try {
          const userFound = await getOneById(userData.auth.accountId);
          if (userFound) {
            navigation.navigate('Travels', {
              accountId: (userFound as LoginInterface).accountId,
            });
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    // verifyIfUserIsLoggedIn();
  }, [navigation]);
  return (
    <ScrollView>
      <View>
        <Header
          backgroundColor={mainColor}
          leftComponent={{
            text: '¡Bienvenido!',
            style: globalStyles.leftComponent,
          }}
          placement="left"
          containerStyle={globalStyles.header}
        />
      </View>
      <View
        style={
          Platform.OS === 'android'
            ? globalStyles.container
            : globalStyles.containerOS
        }>
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
              onChangeText={handlePasswordChange}
              text="Contraseña"
              placeholder="Contraseña"
              isPassword={true}
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text
                style={[globalStyles.lightedColor, globalStyles.boldInputText]}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <ButtonShared title="Ingresar" onPress={handleLoginButton} />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <View style={globalStyles.inlineItems}>
              <Text>¿No tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text
                  style={[
                    globalStyles.lightedColor,
                    globalStyles.boldInputText,
                  ]}>
                  Regístrate
                </Text>
              </TouchableOpacity>
            </View>
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

export default LoginScreen;
