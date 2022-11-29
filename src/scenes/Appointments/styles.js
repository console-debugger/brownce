import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH, isAndroid} from '../../components/helper';
import {dynamicSize, getFontSize} from '../../utils/responsive';
import {
  MID_LIGHT_GRAY,
  LIGHT_BROWN,
  LIGHT_WHITE,
  THEME,
  WHITE,
  LIGHT_GRAY,
  MID_GRAY,
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
    justifyContent: 'space-between',
  },
  bookingId: {
    fontFamily: montserratMedium,
    color: MID_LIGHT_GRAY,
  },
  idvalue: {
    fontFamily: montserratBold,
  },
  itemMainContainer: {
    marginTop: SCREEN_HEIGHT * 0.015,
    flexDirection: 'row',
  },
  image: {
    marginRight: dynamicSize(10),
    borderRadius: dynamicSize(5),
    width: SCREEN_HEIGHT * 0.079,
    height: SCREEN_HEIGHT * 0.079,
  },
  name: {
    fontSize: getFontSize(14),
    fontFamily: montserratBold,
    bottom: 3,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: dynamicSize(10),
  },
  chatIcon: {
    width: dynamicSize(20),
    resizeMode: 'contain',
    height: dynamicSize(20),
  },
  buttonContainer: {
    marginLeft: dynamicSize(8),
    width: null,
    backgroundColor: LIGHT_BROWN,
    paddingHorizontal: dynamicSize(13),
    paddingVertical: dynamicSize(5),
    height: null,
  },
  buttonContainer1: {
    width: null,
    backgroundColor: LIGHT_BROWN,
    paddingHorizontal: dynamicSize(13),
    paddingVertical: dynamicSize(5),
    height: null,
  },
  buttonText: {
    fontSize: getFontSize(12),
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: LIGHT_WHITE,
  },
  outerCurver: {
    backgroundColor: THEME,
    width: SCREEN_WIDTH,
  },
  innerCurve: {
    borderTopLeftRadius: isAndroid ? dynamicSize(25) : dynamicSize(25),
    borderTopRightRadius: isAndroid ? dynamicSize(25) : dynamicSize(25),
    backgroundColor: LIGHT_WHITE,
    alignItems: 'center',
  },
  spimage: {
    alignSelf: 'center',
    width: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
    height: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
    borderRadius: (isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14) / 2,
  },
  spname: {
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
  lowerInnerCurve: {
    borderTopLeftRadius: isAndroid ? dynamicSize(25) : dynamicSize(25),
    borderTopRightRadius: isAndroid ? dynamicSize(25) : dynamicSize(25),
    backgroundColor: WHITE,
    alignItems: 'center',
    paddingTop: dynamicSize(15),
  },
  portFolioText: {
    marginVertical: dynamicSize(20),
    alignSelf: 'flex-start',
    marginLeft: dynamicSize(25),
    fontFamily: montserratBold,
    fontSize: getFontSize(13),
  },
  portfolioImage: {
    marginRight: dynamicSize(20),
    width: SCREEN_WIDTH / 3 - dynamicSize(30),
    height: SCREEN_WIDTH / 3 - dynamicSize(30),
    borderRadius: dynamicSize(20),
  },
  selected: {
    backgroundColor: LIGHT_BROWN,
    borderColor: LIGHT_BROWN,
  },
  unselected: {
    backgroundColor: WHITE,
    borderColor: LIGHT_GRAY,
  },
  selectedText: {
    color: WHITE,
  },
  unselectedText: {
    color: MID_GRAY,
  },
  portfolioFlatList: {
    width: SCREEN_WIDTH,
    paddingHorizontal: dynamicSize(25),
  },
  hairTypeFlatList: {
    paddingVertical: SCREEN_HEIGHT * 0.02,
    width: SCREEN_WIDTH,
    paddingHorizontal: dynamicSize(35),
  },
  productImage: {
    width: SCREEN_WIDTH * 0.44,
    height: SCREEN_HEIGHT * 0.24,
    borderRadius: 10,
  },
  price: {
    color: THEME,
    fontFamily: montserratBold,
    marginTop: 10,
    width: '50%',
  },
  desc: {
    fontSize: getFontSize(10),
    marginTop: 5,
  },
  stock: {
    color: 'red',
    marginTop: 10,
  },
  shareContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareText: {
    marginTop: dynamicSize(20),
    marginLeft: dynamicSize(20),
    color: THEME,
    fontFamily: montserratSemiBold,
    fontSize: getFontSize(16),
  },
});

export default styles;
