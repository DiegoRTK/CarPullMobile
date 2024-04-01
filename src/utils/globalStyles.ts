// globalStyles.js
import {Dimensions, StyleSheet} from 'react-native';
import {errorColor, lightedColor, mainColor, whiteColor} from './constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const globalStyles = StyleSheet.create({
  header: {
    height: 200,
    alignItems: 'flex-end',
    color: '#fff',
  },
  headerSecondary: {
    height: 180,
    alignItems: 'flex-end',
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 20,
  },
  containerOS: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  column: {
    flex: 1,
    marginLeft: 0,
  },
  col1: {
    flex: 0.1,
  },
  col2: {
    flex: 0.16,
  },
  col3: {
    flex: 0.25,
  },
  col4: {
    flex: 0.33,
    marginHorizontal: 5,
  },
  col5: {
    flex: 0.416,
  },
  col6: {
    flex: 0.5,
  },
  col7: {
    flex: 0.583,
  },
  col9: {
    flex: 0.75,
  },
  col10: {
    flex: 0.83,
  },
  centeredTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
  },
  centerBody: {
    textAlign: 'center',
  },
  mainColor: {
    backgroundColor: mainColor,
    borderRadius: 25,
  },
  whiteColor: {
    backgroundColor: whiteColor,
    borderColor: mainColor,
    borderRadius: 25,
  },
  lightedColor: {
    color: lightedColor,
  },
  errorColor: {
    color: errorColor,
    fontSize: 13,
  },
  leftComponent: {
    color: '#fff',
    fontSize: 35,
    marginHorizontal: 20,
    marginTop: 40,
    fontWeight: 'bold',
  },
  leftComponentSecondHeader: {
    color: '#fff',
    fontSize: 30,
    marginHorizontal: 20,
    marginTop: 40,
    fontWeight: '900',
  },
  iconsHeader: {
    marginTop: 40,
    color: whiteColor,
  },
  boldInputText: {
    fontWeight: 'bold',
  },
  grayText: {
    color: 'gray',
  },
  sharedInput: {
    paddingHorizontal: 15,
    fontSize: 15,
  },
  removeUnderline: {
    borderWidth: 0.5,
    height: 50,
    borderRadius: 10,
    borderColor: 'gray',
  },
  mainButton: {
    backgroundColor: lightedColor,
    padding: 16,
    borderRadius: 10,
  },
  textMainButton: {
    fontSize: 13,
  },
  inlineItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointerEvents: {
    pointerEvents: 'auto',
  },
  alignLeft: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  alignRight: {
    justifyContent: 'flex-end',
    textAlignVertical: 'center',
  },
  alignCenter: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    textAlignVertical: 'bottom',
  },
  verticalCenter: {
    textAlignVertical: 'center',
  },
  backgroundTransparent: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  alignCountryPicker: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  boxNumber: {
    fontSize: 20,
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    margin: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'lightgray',
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  firstInput: {
    marginLeft: 5,
  },
  marginTop: {
    marginTop: 5,
  },
  marginTop2: {
    marginTop: 10,
  },
  marginTop3: {
    marginTop: 20,
  },
  marginBottom: {
    marginBottom: 5,
  },
  marginBottom2: {
    marginBottom: 10,
  },
  marginBottom3: {
    marginBottom: 20,
  },
  marginVertical: {
    marginVertical: 5,
  },
  marginVertical2: {
    marginVertical: 10,
  },
  marginHorizontal: {
    marginHorizontal: 5,
  },
  marginHorizontal2: {
    marginHorizontal: 10,
  },
  marginHorizontal3: {
    marginHorizontal: 20,
  },
  inlineText: {
    flexDirection: 'row',
  },
  inputStyle: {
    backgroundColor: 'none', // Color de fondo
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: 'gray',
    borderRadius: 10,
    height: 50,
  },
  paddingTab: {
    padding: 6,
  },
  padding: {
    padding: 10,
  },
  fontSizeSmall: {
    fontSize: 10,
  },
  fontSizeMedium: {
    fontSize: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedCol: {
    borderColor: mainColor, // Cambia el color según lo necesites
    borderWidth: 2,
  },
  map: {
    height: screenHeight * 0.5,
    width: screenWidth * 0.85,
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dropdownHeader: {
    height: 40,
    backgroundColor: lightedColor,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  placeholderHeaderStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  label: {
    position: 'absolute',
    backgroundColor: mainColor,
    left: 22,
    color: 'white',
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  containerSelect: {
    backgroundColor: mainColor,
    padding: 16,
  },
  tabSelectedStyle: {
    backgroundColor: 'white',
    borderRadius: 30,
  },
  tabItemTitle: {
    color: mainColor,
    fontSize: 14,
    height: 35,
    fontWeight: '700',
    textTransform: 'none',
  },
  selectedTabItemTitle: {
    color: whiteColor,
    fontSize: 14,
    height: 35,
    fontWeight: '700',
    textTransform: 'none',
  },
  roundedButton: {
    borderRadius: 20,
  },
  smallSizeTabs: {
    height: 40,
  },
});
