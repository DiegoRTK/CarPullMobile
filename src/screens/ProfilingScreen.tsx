import React, {useState} from 'react';
import {Platform, ScrollView, View} from 'react-native';
import {Text} from 'react-native-elements';
import {globalStyles} from '../utils/globalStyles';
import InputShared from '../components/Input';
import CheckBoxShared from '../components/CheckBox';
import ButtonShared from '../components/Button';
import {createProfileData} from '../utils/api/apiAccount';
import {UserProfile} from '../models/Profile';
import DialogShared, {DialogType} from '../components/Dialog';
import {ScreenNavigationProps} from '../utils/constants';
import {LoginInterface} from '../models/LoginInterface';
import {ROLES_ENUM} from '../enum/roles-enum';

const ProfilingScreen: React.FC<ScreenNavigationProps<'Profiling'>> = ({
  navigation,
  route,
}) => {
  const accId = Number(route.params?.accountId);
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isConductor, setIsConductor] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>('error');

  const handleDialogClose = () => {
    if (dialogType.includes('success')) {
      if (!isConductor) {
        navigation.navigate('Travels', {
          accountId: accId,
        });
      }
    }
    setDialogVisible(false);
  };

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handlePhoneNumberChange = (newNumber: string) => {
    setPhoneNumber(newNumber);
    if (newNumber.length > 0) {
      if (!newNumber.startsWith('6') || newNumber.length < 9) {
        setErrorMessage(
          'El número de teléfono debe comenzar con "6" y tener al menos 9 caracteres.',
        );
      } else {
        setErrorMessage('');
      }
    }
  };

  const handleSubmit = async () => {
    const userData: UserProfile = {
      isConductor: isConductor,
      phoneNumber: phoneNumber,
      username: username,
      activeRol: '',
    };
    if (!userData.username) {
      setDialogTitle('El usuario no puede estar vacío.');
      setDialogText('');
      setDialogVisible(true);
      return;
    }
    if (!userData.phoneNumber || errorMessage) {
      setDialogTitle('El número de teléfono no puede estar vacío.');
      setDialogText('');
      setDialogVisible(true);
      return;
    }
    if (!errorMessage) {
      try {
        userData.activeRol = userData.isConductor
          ? ROLES_ENUM.DRIVER
          : ROLES_ENUM.PASSANGER;
        const userRes: LoginInterface = await createProfileData(
          accId,
          userData,
        );
        setDialogType('check');
        setDialogTitle('¡Creación exitosa!');
        setDialogText('Se ha creado correctamente la cuenta.');
        setDialogVisible(true);
        if (isConductor) {
          navigation.navigate('DriverRegisterHome', {
            accountId: userRes.accountId,
          });
          return;
        }
        navigation.navigate('Travels', {accountId: userRes.accountId});
      } catch (error) {
        setDialogType('error');
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
    } else {
      setDialogType('error');
      setDialogTitle(errorMessage);
      setDialogVisible(true);
      return;
    }
  };

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
              Perfil
            </Text>
            <View style={globalStyles.row}>
              <View style={globalStyles.column}>
                <Text style={globalStyles.grayText}>
                  Completa con tus datos para validar tu cuenta
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={globalStyles.row} />
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <InputShared
              onChangeText={handleUsernameChange}
              text="Nombre de usuario"
              placeholder="Nombre de usuario"
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <InputShared
              onChangeText={handlePhoneNumberChange}
              text="Número de móvil"
              placeholder="Ejemplo: 679 11 14 21"
              isNumber={true}
              errorMessage={errorMessage}
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.alignLeft}>
            <CheckBoxShared
              onPress={() => setIsConductor(!isConductor)}
              title={<Text>Deseo ser conductor</Text>}
              checked={isConductor}
              checkedTitle="Aceptado"
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <ButtonShared title={'Finalizar'} onPress={handleSubmit} />
          </View>
        </View>
      </View>
      <View style={globalStyles.container}>
        <DialogShared
          text={dialogText}
          title={dialogTitle}
          visible={dialogVisible}
          onClose={handleDialogClose}
          type={dialogType}
        />
      </View>
    </ScrollView>
  );
};

export default ProfilingScreen;
