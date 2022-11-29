import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH, isAndroid} from '../../components/helper';
import {dynamicSize, getFontSize} from '../../utils/responsive';
import {
  MID_LIGHT_GRAY,
  LIGHT_WHITE,
  MID_GRAY,
  THEME,
  WHITE,
  BLACK,
} from '../../utils/colors';
import {
  montserratMedium,
  montserratBold,
  montserratSemiBold,
} from '../../utils/fontFamily';

const styles = StyleSheet.create({
  seperator: {
    height: SCREEN_HEIGHT * 0.02,
  },
  flatList: {
    paddingVertical: dynamicSize(15),
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  itemContainer: {
    width: SCREEN_WIDTH - dynamicSize(30),
    padding: dynamicSize(8),
  },
  headerContent: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  bookingId: {
    fontFamily: montserratMedium,
    color: MID_LIGHT_GRAY,
  },
  service: {
    fontFamily: montserratMedium,
    color: MID_LIGHT_GRAY,
  },
  idvalue: {
    fontFamily: montserratBold,
  },
  itemMainContainer: {
    marginTop: SCREEN_HEIGHT * 0.015,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    marginRight: dynamicSize(10),
    borderRadius: dynamicSize(5),
    width: SCREEN_HEIGHT * 0.08,
    height: SCREEN_HEIGHT * 0.08,
  },
  customerImage: {
    alignSelf: 'center',
    width: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
    height: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
    borderRadius: (isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14) / 2,
  },
  name: {
    fontSize: getFontSize(14),
    fontFamily: montserratBold,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: LIGHT_WHITE,
  },
  shareContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareText: {
    marginLeft: dynamicSize(20),
    color: THEME,
    fontFamily: montserratSemiBold,
    fontSize: getFontSize(16),
  },
  customername: {
    alignSelf: 'center',
    fontSize: getFontSize(16),
    fontFamily: montserratSemiBold,
    marginBottom: dynamicSize(8),
  },
  detail: {
    alignSelf: 'center',
    fontSize: getFontSize(12),
    marginBottom: dynamicSize(5),
    fontFamily: montserratSemiBold,
  },
  curveMain: {
    marginTop: SCREEN_HEIGHT * 0.04,
    backgroundColor: LIGHT_WHITE,
  },
  lowerContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: WHITE,
  },
  hairType: {
    marginLeft: dynamicSize(35),
    fontFamily: montserratMedium,
    marginBottom: dynamicSize(10),
  },
  value: {
    fontFamily: montserratBold,
  },
  cardStyle: {
    borderWidth: 0.5,
    borderColor: MID_GRAY,
    borderRadius: dynamicSize(5),
    width: SCREEN_WIDTH - dynamicSize(70),
    paddingHorizontal: dynamicSize(15),
    paddingVertical: SCREEN_HEIGHT * 0.015,
  },
  uploadText: {
    color: BLACK,
    fontFamily: montserratSemiBold,
    marginVertical: SCREEN_HEIGHT * 0.015,
  },
  innerStyle: {
    backgroundColor: WHITE,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: dynamicSize(18),
  },
  chatIcon: {
    width: dynamicSize(20),
    resizeMode: 'contain',
    height: dynamicSize(20),
    bottom: 2,
  },
  editIcon: {
    width: dynamicSize(12),
    height: dynamicSize(12),
    marginLeft: dynamicSize(5),
  },
  description: {
    color: MID_GRAY,
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  buttonContainer: {
    marginLeft: dynamicSize(8),
    width: null,
    paddingHorizontal: dynamicSize(13),
    paddingVertical: dynamicSize(5),
    height: null,
  },
  buttonText: {
    fontSize: getFontSize(12),
  },
  services: {
    marginLeft: SCREEN_WIDTH * 0.05,
    fontFamily: montserratBold,
    fontSize: getFontSize(14),
  },
  selected: {
    backgroundColor: THEME,
    borderColor: THEME,
  },
  selectedText: {
    color: LIGHT_WHITE,
  },
  hairTypeFlatList: {
    paddingHorizontal: dynamicSize(22),
  },
  notetitle: {
    fontFamily: montserratBold,
    fontSize: getFontSize(14),
  },
  notes: {
    width: SCREEN_WIDTH * 0.9,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    backgroundColor: WHITE,
    paddingVertical: SCREEN_WIDTH * 0.02,
    borderRadius: 10,
    marginLeft: SCREEN_WIDTH * 0.05,
  },
  notetext: {},
});

export default styles;
