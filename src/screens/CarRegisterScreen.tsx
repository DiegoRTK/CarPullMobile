import React, {useEffect, useState} from 'react';
import {ScrollView, View, Platform} from 'react-native';
import {ScreenNavigationProps} from '../utils/constants';
import {globalStyles} from '../utils/globalStyles';
import InputShared from '../components/Input';
import {Text} from 'react-native-elements';
import ButtonShared from '../components/Button';
import DialogShared, {DialogType} from '../components/Dialog';
import {CarInterface} from '../models/Car';
import {createCar, getCarByAccount, updateCar} from '../utils/api/apiCar';

const CarRegisterScreen: React.FC<ScreenNavigationProps<'CarRegister'>> = ({
  navigation,
  route,
}) => {
  const [color, setColor] = useState('');
  const [model, setModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [passengersNumber, setPassengersNumber] = useState<number | string>(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState('');
  const [dialogType, setDialogType] = useState<DialogType>('error');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [mode, setMode] = useState('create');
  const [initialValues, setInitialValues] = useState<CarInterface | null>(null);
  const [editedValues, setEditedValues] = useState<CarInterface>({
    color: '',
    model: '',
    registryNumber: '',
    passengerNumber: 0,
  });
  useEffect(() => {
    if (route.params.accountId) {
      getCarByAccount(route.params.accountId)
        .then((carFound: CarInterface) => {
          setInitialValues({...carFound});
          setMode('edit');
          setEditedValues({...carFound});
        })
        .catch(error => {
          if (typeof error === 'string') {
            setDialogTitle(error);
          } else if (error instanceof Error) {
            setDialogTitle(error.message);
          } else {
            setDialogTitle('Ocurrió un error desconocido.');
          }
        });
    } else {
      setEditedValues({
        color: '',
        model: '',
        registryNumber: '',
        passengerNumber: 4,
      });
    }
  }, [route.params.accountId]);
  const handleCloseDialog = () => {
    setDialogVisible(false);
    if (dialogType === 'check') {
      navigation.navigate('DriverRegisterHome', {
        accountId: route.params.accountId,
      });
    }
  };
  const handleColorChange = (newColor: string) => {
    if (mode === 'edit') {
      setEditedValues(prevValues => ({...prevValues, color: newColor}));
    } else {
      setColor(newColor);
    }
  };

  const handleModelChange = (newModel: string) => {
    if (mode === 'edit') {
      setEditedValues(prevValues => ({...prevValues, model: newModel}));
    } else {
      setModel(newModel);
    }
  };

  const handleLicensePlateChange = (newLicensePlate: string) => {
    if (newLicensePlate === '') {
      setErrorMessage('');
    } else {
      const regEx = /^[0-9A-Z]{4}[ -]?[0-9A-Z]{3}$/;
      if (!regEx.test(newLicensePlate)) {
        setErrorMessage('La matrícula no es válida');
      } else if (!/^[0-9A-Z]*$/.test(newLicensePlate)) {
        setErrorMessage('La matrícula no debe contener caracteres especiales');
      } else {
        setErrorMessage('');
      }
    }
    if (mode === 'edit') {
      setEditedValues(prevValues => ({
        ...prevValues,
        registryNumber: newLicensePlate,
      }));
    } else {
      setLicensePlate(newLicensePlate);
    }
  };

  const handleNewPassengersNumberChange = (newPassengersNumber: string) => {
    const parsedNumber = parseInt(newPassengersNumber, 10);
    if (!isNaN(parsedNumber)) {
      if (mode === 'edit') {
        setEditedValues(prevValues => ({
          ...prevValues,
          passengerNumber: parsedNumber,
        }));
      } else {
        setPassengersNumber(parsedNumber);
      }
    } else {
      if (mode === 'edit') {
        setEditedValues(prevValues => ({
          ...prevValues,
          passengerNumber: '',
        }));
      } else {
        setPassengersNumber(0);
      }
    }
  };

  const handleSubmit = async () => {
    if (mode === 'create') {
      if (!color || !model || !licensePlate || !passengersNumber) {
        setDialogTitle('Todos los campos son obligatorios.');
        setDialogText('');
        setDialogType('error');
        setDialogVisible(true);
        return;
      }
      try {
        const carItem: CarInterface = {
          color,
          model,
          registryNumber: licensePlate,
          passengerNumber: passengersNumber as number,
          accountId: route.params.accountId,
        };
        await createCar(carItem);
        setDialogTitle(
          '¡Se han agregado correctamente los detalles del carro!',
        );
        setDialogText('');
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
    }

    if (mode === 'edit') {
      if (
        !editedValues.color ||
        !editedValues.model ||
        !editedValues.registryNumber ||
        !editedValues.passengerNumber
      ) {
        setDialogTitle('Todos los campos son obligatorios.');
        setDialogType('error');
        setDialogVisible(true);
        return;
      }
      try {
        const carItem: CarInterface = {
          color: editedValues.color || initialValues?.color || '',
          model: editedValues.model || initialValues?.model || '',
          registryNumber:
            editedValues.registryNumber || initialValues?.registryNumber || '',
          passengerNumber:
            editedValues.passengerNumber !== undefined
              ? editedValues.passengerNumber
              : initialValues?.passengerNumber || 0,
          accountId: route.params.accountId,
        };
        const {carId} = initialValues as CarInterface;
        console.log(carItem, carId as string);
        await updateCar(carItem, carId as string);
        setDialogTitle('¡Se han editado correctamente los detalles del carro!');
        setDialogText('');
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
              h4={true}>
              Datos del vehículo
            </Text>
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <InputShared
              value={
                mode === 'edit'
                  ? editedValues.color || ''
                  : initialValues?.color || ''
              }
              onChangeText={handleColorChange}
              text="Color"
              placeholder="Color"
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <InputShared
              value={
                mode === 'edit'
                  ? editedValues.model || ''
                  : initialValues?.model || ''
              }
              onChangeText={handleModelChange}
              text="Modelo"
              placeholder="Modelo"
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <InputShared
              value={
                mode === 'edit'
                  ? editedValues.registryNumber || ''
                  : initialValues?.registryNumber || ''
              }
              errorMessage={errorMessage}
              onChangeText={handleLicensePlateChange}
              text="Matrícula"
              placeholder="Sin caracteres especiales"
            />
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <InputShared
              inputType="numeric"
              value={
                mode === 'edit'
                  ? editedValues.passengerNumber.toString() || ''
                  : initialValues?.passengerNumber.toString() || ''
              }
              onChangeText={handleNewPassengersNumberChange}
              text="Número de pasajeros"
              placeholder="Cantidad máxima de pasajeros"
            />
          </View>
        </View>
        <View style={[globalStyles.row, globalStyles.marginVertical2]}>
          <View style={globalStyles.col3} />
          <View style={globalStyles.col3}>
            <ButtonShared
              title={mode === 'create' ? 'Guardar' : 'Editar'}
              onPress={handleSubmit}
            />
          </View>
          <View style={globalStyles.col3} />
        </View>
      </View>
      <View style={globalStyles.container}>
        <DialogShared
          text={dialogText}
          type={dialogType}
          title={dialogTitle}
          visible={dialogVisible}
          onClose={handleCloseDialog}
        />
      </View>
    </ScrollView>
  );
};

export default CarRegisterScreen;
