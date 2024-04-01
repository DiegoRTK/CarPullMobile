import React, {useEffect, useState} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  Text,
  BackHandler,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getOneById} from '../utils/api/apiAccount';
import {UserInterface} from '../models/User';
import {ScreenNavigationProps, mainColor, whiteColor} from '../utils/constants';
import {globalStyles} from '../utils/globalStyles';
import DialogShared from '../components/Dialog';
import {ROLES_ENUM} from '../enum/roles-enum';
import {Header, Icon} from 'react-native-elements';
import MapShared from '../components/Map';
import SelectShared from '../components/Select';
import {RolDetail} from '../models/Role';
import TabShared from '../components/Tab';

const TravelsScreen: React.FC<ScreenNavigationProps<'Travels'>> = ({
  navigation,
  route,
}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState('');
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<any>([]);
  const [modesLst, setModesLst] = useState<Array<Record<string, string>>>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    const verifyIfUserIsCompleted = async () => {
      try {
        const userData = (await getOneById(
          route.params.accountId,
        )) as UserInterface;
        if (!userData.username && !userData.phoneNumber) {
          navigation.navigate('Profiling', {
            accountId: (userData as UserInterface).accountId,
          });
          return;
        }
        if (
          userData.activeRole === ROLES_ENUM.DRIVER &&
          !userData.conductorFinishRegistry
        ) {
          navigation.navigate('DriverRegisterHome', {
            accountId: (userData as UserInterface).accountId,
          });
          return;
        }
        const rolesMap = userData.roles.map(row => ({
          label: (row.role as RolDetail).roleName,
          value: (row.role as RolDetail).roleId.toString(),
        }));
        setMode(rolesMap.find(row => row.label === userData.activeRole)?.value);
        setModesLst(rolesMap);
      } catch (error) {
        const errorMessage =
          typeof error === 'string'
            ? error
            : error instanceof Error
            ? error.message
            : 'Ocurrió un error desconocido.';
        setDialogTitle(errorMessage);
        setDialogText('');
        setDialogVisible(true);
      } finally {
        setLoading(false);
      }
    };

    verifyIfUserIsCompleted();

    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation, route.params.accountId]);
  const handleTabChange = (tab: number) => {
    setSelectedTab(tab);
  };
  const handleCloseDialog = () => {
    setDialogVisible(false);
  };
  const handleModeChange = (value: Record<string, string>) => {
    setMode(value.value);
  };

  if (loading) {
    return (
      <View style={[globalStyles.container]}>
        <ActivityIndicator size="large" color={mainColor} />
      </View>
    );
  }
  return (
    <ScrollView>
      <Header
        backgroundColor={mainColor}
        rightComponent={
          <View style={globalStyles.row}>
            <View
              style={[
                globalStyles.marginVertical2,
                globalStyles.marginHorizontal2,
              ]}>
              <Icon
                color={whiteColor}
                size={30}
                style={globalStyles.iconsHeader}
                name={'notifications'}
              />
            </View>
            <View
              style={[
                globalStyles.marginVertical2,
                globalStyles.marginHorizontal2,
              ]}>
              <Icon
                size={30}
                color={whiteColor}
                style={globalStyles.iconsHeader}
                name={'calendar-month'}
              />
            </View>
          </View>
        }
        leftComponent={
          <>
            <View style={globalStyles.row}>
              <Text style={globalStyles.leftComponentSecondHeader}>
                Mis viajes
              </Text>
            </View>
            <View style={globalStyles.row}>
              <View style={globalStyles.column}>
                <SelectShared
                  title={'Modo'}
                  value={mode}
                  placeholderStyle={globalStyles.placeholderHeaderStyle}
                  placeholder={mode}
                  style={globalStyles.dropdownHeader}
                  search={false}
                  data={modesLst}
                  onChange={handleModeChange}
                />
              </View>
            </View>
          </>
        }
        collapsable={true}
        placement="left"
        containerStyle={globalStyles.headerSecondary}
      />
      <View
        style={
          Platform.OS === 'android'
            ? globalStyles.container
            : globalStyles.containerOS
        }>
        <View style={globalStyles.row}>
          <View
            style={[
              globalStyles.column,
              globalStyles.mainColor,
              globalStyles.paddingTab,
            ]}>
            <TabShared
              tabSelected={selectedTab}
              onChange={handleTabChange}
              items={[{title: 'Aceptados'}, {title: 'Pendientes'}]}
            />
          </View>
        </View>
        {/* <MapShared
          lat={52.077435}
          lon={4.316076}
          markers={[
            {lat: 52.077435, lon: 4.316076, title: 'The Hague Library'},
          ]}
        /> */}
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

export default TravelsScreen;
