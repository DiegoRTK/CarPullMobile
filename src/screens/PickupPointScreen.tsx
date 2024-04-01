import {ScrollView} from 'react-native-gesture-handler';
import {ScreenNavigationProps} from '../utils/constants';
import React, {useCallback, useEffect, useState} from 'react';
import {Text} from 'react-native-elements';
import {View, Platform} from 'react-native';
import {globalStyles} from '../utils/globalStyles';
import InputShared from '../components/Input';
import SearchBarShared from '../components/SearchAutomplete';
import {TAutocompleteDropdownItem} from 'react-native-autocomplete-dropdown';
import {PlaceInterface} from '../models/Place';
import {placesApi} from '../utils/api/apiAccount';
import ButtonShared from '../components/Button';
import {createLocation, getLocationsByAccount} from '../utils/api/apiLocation';
import {LocationInterface} from '../models/Location';
import DialogShared, {DialogType} from '../components/Dialog';

const PickupPointScreen: React.FC<ScreenNavigationProps<'PickupPoint'>> = ({
  navigation,
  route,
}) => {
  const [selectedItem, setSelectedItem] = useState<PlaceInterface>();
  const [places, setPlaces] = useState<Array<TAutocompleteDropdownItem>>([]);
  const [wholePlaces, setWholePlaces] = useState<Array<PlaceInterface>>([]);
  const [reference, setReference] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState('');
  const [dialogType, setDialogType] = useState<DialogType>('error');
  const [dialogVisible, setDialogVisible] = useState(false);
  // useEffect(() => {
  //   getLocations();
  // }, []);
  // const getLocations = async () => {
  //   try {
  //     const locationFound = await getLocationsByAccount(
  //       String(route.params.accountId),
  //     );
  //     console.log(locationFound);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleCloseDialog = () => {
    setDialogVisible(false);
    if (dialogType === 'check') {
      navigation.navigate('DriverRegisterHome', {
        accountId: route.params.accountId,
      });
    }
  };
  const handleSelectItem = (newItem: TAutocompleteDropdownItem) => {
    if (newItem) {
      const item: any = wholePlaces.find(
        row => String(row.place_id),
        String(newItem.id),
      );
      setSelectedItem(item);
    }
  };
  const handleClearChange = () => {
    setPlaces([]);
    setWholePlaces([]);
  };
  const handleQueryChange = useCallback(
    async (newQuery: string) => {
      try {
        const placesSearched = (await placesApi(
          newQuery,
        )) as Array<PlaceInterface>;
        setWholePlaces(placesSearched);
        const autocompleteItems = placesSearched.map(
          row =>
            ({
              id: `${row.place_id}`,
              title: row.display_name,
            } as TAutocompleteDropdownItem),
        );
        setPlaces(autocompleteItems);
      } catch (error) {
        if (typeof error === 'string') {
          setDialogTitle(error);
        } else if (error instanceof Error) {
          setDialogTitle(error.message);
        } else {
          setDialogTitle('Ocurrió un error desconocido.');
        }
        return;
      }
    },
    [setPlaces],
  );
  const handleSubmit = async () => {
    try {
      const locationIten: LocationInterface = {
        address: selectedItem?.display_name as string,
        latitude: selectedItem?.lat as string,
        longitude: selectedItem?.lon as string,
        reference: reference,
        accountId: route.params.accountId,
      };
      await createLocation(locationIten);
      setDialogTitle('¡Se ha agregado correctamente la ubicación!');
      setDialogText('');
      setDialogType('check');
      setDialogVisible(true);
    } catch (error) {
      if (typeof error === 'string') {
        setDialogTitle(error);
      } else if (error instanceof Error) {
        setDialogTitle(error.message);
      } else {
        setDialogTitle('Ocurrió un error desconocido.');
      }
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
              Punto de recogida
            </Text>
          </View>
        </View>
        <View style={[globalStyles.row, globalStyles.marginBottom2]}>
          <View style={globalStyles.column}>
            <Text style={globalStyles.grayText}>
              Introduce como mínimo una dirección por la que recogerás a tus
              pasajeros
            </Text>
          </View>
        </View>
        <View style={[globalStyles.row, globalStyles.marginVertical2]}>
          <View style={globalStyles.column}>
            <SearchBarShared
              onClear={handleClearChange}
              onSelectItem={handleSelectItem}
              title="Direccción, número, población"
              placeholder="General Martínez Campos, 37 28010 Madrid"
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={true}
              debounce={300}
              onChangeText={handleQueryChange}
              dataSet={places}
            />
          </View>
        </View>
        <View style={[globalStyles.row, globalStyles.marginVertical2]}>
          <View style={globalStyles.column}>
            <InputShared
              onChangeText={(text: string) => setReference(text)}
              text="Información adicional"
              placeholder="Urbanización, torre, apartamento, referencia"
            />
          </View>
        </View>
        <View style={[globalStyles.row, globalStyles.marginVertical2]}>
          <View style={globalStyles.col3} />
          <View style={globalStyles.col3}>
            <ButtonShared title="Guardar" onPress={handleSubmit} />
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

export default PickupPointScreen;
