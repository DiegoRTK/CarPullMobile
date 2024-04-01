import {ScrollView, View, Platform} from 'react-native';
import {ScreenNavigationProps, mainColor} from '../utils/constants';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../utils/globalStyles';
import {Divider, Text} from 'react-native-elements';
import ScheduleCalendar, {SelectedDates} from '../components/Calendar';
import {createNewDay, getDaysByAccount} from '../utils/api/apiDay';
import {DayInterface, DaysCreated} from '../models/Day';
import ButtonShared from '../components/Button';
import {WORKSHIT_ENUM, WORKSHIT_HOUR_ENUM} from '../enum/workshift-enum';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getLocationsByAccount} from '../utils/api/apiLocation';
import {LocationInterface} from '../models/Location';
import CheckBoxShared from '../components/CheckBox';
import DialogShared, {DialogType} from '../components/Dialog';
import CardShared from '../components/Card';

const ScheduleScreen: React.FC<ScreenNavigationProps<'Schedule'>> = ({
  navigation,
  route,
}) => {
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({});
  const [isCreatingSchedule, setIsCreatingSchedue] = useState(false);
  const [days, setDays] = useState<Array<DaysCreated>>([]);
  const [locations, setLocations] = useState<Array<LocationInterface>>([]);
  const [selectedCol, setSelectedCol] = useState<Array<string>>([]);
  const [selectedLocId, setSelectedLocId] = useState<number>();
  const [selectedLoc, setSelectedLoc] = useState<LocationInterface>();
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState('');
  const [dialogType, setDialogType] = useState<DialogType>('error');
  const [dialogVisible, setDialogVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getDays = (await getDaysByAccount(
          route.params.accountId,
          true,
        )) as DaysCreated[];
        setDays(getDays);
        console.log(getDays);
      } catch (error) {
        console.error('Error al obtener los días:', error);
      }
    };
    const fetchLocations = async () => {
      try {
        const locationsFound = (await getLocationsByAccount(
          route.params.accountId,
        )) as LocationInterface[];
        setLocations(locationsFound);
      } catch (error) {
        console.error('Error al obtener los días:', error);
      }
    };
    fetchData();
    fetchLocations();
  }, [route.params.accountId]);
  const handleCloseDialog = () => {
    setDialogVisible(false);
    if (dialogType === 'check') {
      navigation.navigate('DriverRegisterHome', {
        accountId: route.params.accountId,
      });
    }
  };
  const handleColPress = (col: any[]) => {
    setSelectedCol(col);
  };
  const handleDayPress = (day: string) => {
    const updatedSelectedDates = {...selectedDates};
    if (updatedSelectedDates[day]) {
      delete updatedSelectedDates[day];
    } else {
      updatedSelectedDates[day] = {
        marked: true,
        selected: true,
        selectedColor: mainColor,
      };
    }
    setSelectedDates(updatedSelectedDates);
  };
  const handleSelectLocation = (location: LocationInterface) => {
    setSelectedLoc(location);
    setSelectedLocId(location.locationId);
  };
  const handleSubmit = async () => {
    const newLocation: DayInterface = {
      dates: Object.keys(selectedDates).map(row => new Date(row)),
      time: selectedCol[0],
      workHour: selectedCol[1],
      accountId: Number(route.params.accountId),
      locationId: selectedLocId,
      latitude: selectedLoc?.latitude as string,
      longitude: selectedLoc?.longitude as string,
      reference: selectedLoc?.reference as string,
      address: selectedLoc?.address as string,
    };
    // console.log(newLocation);
    // return;
    if (Object.values(newLocation).some(row => !row)) {
      setDialogTitle('Todos los campos son obligatorios.');
      setDialogText('');
      setDialogType('error');
      setDialogVisible(true);
      return;
    }
    try {
      await createNewDay(newLocation);
      setDialogTitle('¡Se ha agregado el día correctamente!');
      setDialogText('');
      setDialogType('check');
      setDialogVisible(true);
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
              style={[globalStyles.boldInputText, globalStyles.centeredTitle]}
              h4={true}>
              Agenda
            </Text>
          </View>
        </View>
        <View style={globalStyles.row}>
          <View style={globalStyles.column}>
            <Text
              style={[globalStyles.boldInputText, globalStyles.alignLeft]}
              h4={true}
              h4Style={globalStyles.fontSizeMedium}>
              Días laborales
            </Text>
          </View>
        </View>
        {isCreatingSchedule ? null : days.length === 0 ? (
          <View style={[globalStyles.container, globalStyles.marginVertical2]}>
            <View style={globalStyles.row}>
              <View style={globalStyles.column}>
                <Text style={globalStyles.alignCenter}>
                  Aún no tienes ningún viaje programado. Toca para crear uno.
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={[globalStyles.container, globalStyles.marginVertical2]}>
            {days.map((row, index) => (
              <CardShared key={index} title={row.address as any} />
            ))}
          </View>
        )}
        {isCreatingSchedule ? (
          <>
            <View style={[globalStyles.row, globalStyles.marginBottom3]}>
              <View style={globalStyles.column}>
                <ScheduleCalendar
                  selectedDates={selectedDates}
                  onDayPress={handleDayPress}
                />
              </View>
            </View>
            <View style={[globalStyles.row, globalStyles.marginVertical2]}>
              <View style={globalStyles.column}>
                <Divider color={mainColor} style={globalStyles.marginBottom3} />
                <Text
                  style={[globalStyles.boldInputText, globalStyles.alignLeft]}
                  h4={true}
                  h4Style={globalStyles.fontSizeMedium}>
                  Turno laboral
                </Text>
              </View>
            </View>
            <View style={[globalStyles.row, globalStyles.marginVertical2]}>
              <TouchableOpacity
                onPress={() =>
                  handleColPress([
                    WORKSHIT_ENUM.MORNING,
                    WORKSHIT_HOUR_ENUM.MORNING,
                  ])
                }
                style={[
                  globalStyles.col4,
                  globalStyles.alignCenter,
                  globalStyles.card,
                  selectedCol[0] === WORKSHIT_ENUM.MORNING &&
                    globalStyles.selectedCol,
                ]}>
                <Text style={globalStyles.cardTitle}>
                  {WORKSHIT_ENUM.MORNING}
                </Text>
                <Text>{WORKSHIT_HOUR_ENUM.MORNING}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleColPress([
                    WORKSHIT_ENUM.AFTERNOON,
                    WORKSHIT_HOUR_ENUM.AFTERNOON,
                  ])
                }
                style={[
                  globalStyles.col4,
                  globalStyles.alignCenter,
                  globalStyles.card,
                  selectedCol[0] === WORKSHIT_ENUM.AFTERNOON &&
                    globalStyles.selectedCol,
                ]}>
                <Text style={globalStyles.cardTitle}>
                  {WORKSHIT_ENUM.AFTERNOON}
                </Text>
                <Text>{WORKSHIT_HOUR_ENUM.AFTERNOON}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleColPress([
                    WORKSHIT_ENUM.NIGHT,
                    WORKSHIT_HOUR_ENUM.NIGHT,
                  ])
                }
                style={[
                  globalStyles.col4,
                  globalStyles.alignCenter,
                  globalStyles.card,
                  selectedCol[0] === WORKSHIT_ENUM.NIGHT &&
                    globalStyles.selectedCol,
                ]}>
                <Text style={globalStyles.cardTitle}>
                  {WORKSHIT_ENUM.NIGHT}
                </Text>
                <Text>{WORKSHIT_HOUR_ENUM.NIGHT}</Text>
              </TouchableOpacity>
            </View>
            <View style={[globalStyles.row, globalStyles.marginVertical2]}>
              <View style={globalStyles.column}>
                <Divider color={mainColor} style={globalStyles.marginBottom3} />
                <Text
                  style={[globalStyles.boldInputText, globalStyles.alignLeft]}
                  h4={true}
                  h4Style={globalStyles.fontSizeMedium}>
                  Punto de recogida
                </Text>
              </View>
            </View>
            <View style={[globalStyles.row, globalStyles.marginVertical2]}>
              <View style={globalStyles.column}>
                {locations.map((row, index) => (
                  <CheckBoxShared
                    key={index}
                    onPress={() => handleSelectLocation(row)}
                    title={row.address}
                    checked={selectedLocId === row.locationId ? true : false}
                    iconRight={true}
                    inputStyled={true}
                  />
                ))}
              </View>
            </View>
            <View style={[globalStyles.row, globalStyles.marginVertical2]}>
              <View style={globalStyles.col3} />
              <View style={globalStyles.col3}>
                <ButtonShared title="Guardar" onPress={handleSubmit} />
              </View>
              <View style={globalStyles.col3} />
            </View>
          </>
        ) : (
          <View style={[globalStyles.row, globalStyles.marginVertical2]}>
            <View style={[globalStyles.column, globalStyles.alignCenter]}>
              <Text style={globalStyles.alignCenter}>
                <ButtonShared
                  title={'Crear nuevo día'}
                  onPress={() => setIsCreatingSchedue(!isCreatingSchedule)}
                />
              </Text>
            </View>
          </View>
        )}
      </View>
      <View style={globalStyles.container}>
        <DialogShared
          text={dialogText}
          title={dialogTitle}
          visible={dialogVisible}
          onClose={handleCloseDialog}
          type={dialogType}
        />
      </View>
    </ScrollView>
  );
};

export default ScheduleScreen;
