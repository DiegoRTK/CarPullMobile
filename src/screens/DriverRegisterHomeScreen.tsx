import React, {useCallback, useState} from 'react';
import {ScreenNavigationProps, mainColor} from '../utils/constants';
import {Divider, LinearProgress, Text} from 'react-native-elements';
import {ScrollView, View, Platform} from 'react-native';
import {globalStyles} from '../utils/globalStyles';
import CheckBoxShared from '../components/CheckBox';
import {getOneById, updateAccount} from '../utils/api/apiAccount';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ButtonShared from '../components/Button';
import {UserInterface} from '../models/User';
import {useFocusEffect} from '@react-navigation/native';
import DialogShared, {DialogType} from '../components/Dialog';

const DriverRegisterHomeScreen: React.FC<
  ScreenNavigationProps<'DriverRegisterHome'>
> = ({navigation, route}) => {
  const [progress, setProgress] = useState(0);
  const [pickupPoint, setPickupPoint] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState('');
  const [dialogType, setDialogType] = useState<DialogType>('error');
  const [dialogVisible, setDialogVisible] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const getUserInfo = async () => {
        try {
          const userData = (await getOneById(
            route.params.accountId,
          )) as UserInterface;
          setVehicleDetails(userData.carRegistry === true);
          setSchedule(userData.daysRegistry === true);
          setPickupPoint(userData.locationsRegistry === true);
        } catch (error) {
          console.error('Error al obtener la información del usuario:', error);
        }
      };
      getUserInfo();
      let count =
        (pickupPoint ? 1 : 0) + (schedule ? 1 : 0) + (vehicleDetails ? 1 : 0);
      setProgress(count / 3);
    }, [route.params.accountId, pickupPoint, schedule, vehicleDetails]),
  );
  const handleCloseDialog = () => {
    setDialogVisible(false);
    if (dialogType === 'check') {
      navigation.navigate('Travels', {
        accountId: route.params.accountId,
      });
    }
  };
  const navigatePickup = async () => {
    navigation.navigate('PickupPoint', {
      accountId: route.params.accountId as number,
    });
  };
  const navigateSchedule = async () => {
    navigation.navigate('Schedule', {
      accountId: route.params.accountId,
    });
  };
  const navigateCarDetail = async () => {
    navigation.navigate('CarRegister', {
      accountId: route.params.accountId as number,
    });
  };
  const handleSubmit = async () => {
    try {
      await updateAccount(route.params.accountId, {
        conductorFinishRegistry: true,
      });
      setDialogText('');
      setDialogTitle('¡Se ha completado el registro exitosamente!');
      setDialogType('check');
      setDialogVisible(true);
    } catch (error) {
      setDialogVisible(true);
      if (typeof error === 'string') {
        setDialogTitle(error);
      } else if (error instanceof Error) {
        setDialogTitle(error.message);
      } else {
        setDialogTitle('Ocurrió un error desconocido.');
      }
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
            <Text
              style={(globalStyles.boldInputText, globalStyles.centeredTitle)}
              h2={true}>
              Alta conductor
            </Text>
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={[globalStyles.col10, globalStyles.alignLeft]}>
            <Text style={globalStyles.boldInputText}>Datos requeridos</Text>
          </View>
          <View style={[globalStyles.col2, globalStyles.alignRight]}>
            <View style={globalStyles.inlineText}>
              <Text
                style={[globalStyles.lightedColor, globalStyles.boldInputText]}>
                {Math.round((progress * 10) / 3)}
              </Text>
              <Text style={globalStyles.grayText}>/3 items</Text>
            </View>
          </View>
        </View>
        <View style={globalStyles.row}>
          <LinearProgress
            value={progress}
            variant="determinate"
            color={mainColor}
          />
        </View>
        <View style={[globalStyles.row, globalStyles.alignLeft]}>
          <View style={globalStyles.column}>
            <TouchableOpacity onPress={navigatePickup}>
              <CheckBoxShared
                title={'Punto de recogida'}
                checked={pickupPoint}
                roundedCheck={true}
              />
            </TouchableOpacity>
            <Divider color={mainColor} />
          </View>
        </View>
        <View style={[globalStyles.row, globalStyles.alignLeft]}>
          <View style={globalStyles.column}>
            <TouchableOpacity onPress={navigateSchedule}>
              <CheckBoxShared
                title={'Agenda'}
                checked={schedule}
                roundedCheck={true}
              />
            </TouchableOpacity>
            <Divider color={mainColor} />
          </View>
        </View>
        <View style={[globalStyles.row, globalStyles.alignLeft]}>
          <View style={globalStyles.column}>
            <TouchableOpacity onPress={navigateCarDetail}>
              <CheckBoxShared
                title={'Datos del vehículo'}
                checked={vehicleDetails}
                roundedCheck={true}
              />
            </TouchableOpacity>
            <Divider color={mainColor} />
          </View>
        </View>
        <View style={[globalStyles.row, globalStyles.marginTop2]} />
        <View style={[globalStyles.row, globalStyles.marginTop2]} />
        <View style={[globalStyles.row, globalStyles.marginTop2]}>
          <View style={globalStyles.col3} />
          <View style={globalStyles.col3}>
            <ButtonShared
              disabled={progress !== 1}
              title="Finalizar"
              onPress={handleSubmit}
            />
          </View>
          <View style={globalStyles.col3} />
        </View>
      </View>
      <DialogShared
        text={dialogText}
        type={dialogType}
        title={dialogTitle}
        visible={dialogVisible}
        onClose={handleCloseDialog}
      />
    </ScrollView>
  );
};

export default DriverRegisterHomeScreen;
