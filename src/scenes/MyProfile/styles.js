import { StyleSheet } from 'react-native';
import {
  THEME,
  LIGHT_WHITE,
  WHITE,
  MID_GRAY,
  BLACK,
  LIGHT_BROWN,
  LIGHT_GRAY,
} from '../../utils/colors';
import {
  montserratSemiBold,
  montserratMedium,
  montserratBold,
} from '../../utils/fontFamily';
import { getFontSize, dynamicSize } from '../../utils/responsive';
import { SCREEN_HEIGHT, isAndroid, SCREEN_WIDTH } from '../../components/helper';

// @ Stylsheet for profile

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: LIGHT_WHITE,
  },
  shareText: {
    marginLeft: dynamicSize(20),
    color: THEME,
    fontFamily: montserratSemiBold,
    fontSize: getFontSize(16),
  },
  editText: {
    marginRight: dynamicSize(20),
    color: THEME,
    fontFamily: montserratSemiBold,
    fontSize: getFontSize(16),
  },
  image: {
    alignSelf: 'center',
    width: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
    height: isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14,
    borderRadius: (isAndroid ? SCREEN_HEIGHT * 0.16 : SCREEN_HEIGHT * 0.14) / 2,
  },
  name: {
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
  innerStyle: {
    backgroundColor: WHITE,
  },
  shareContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  description: {
    color: MID_GRAY,
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  flatList: {
    paddingVertical: SCREEN_HEIGHT * 0.02,
    width: SCREEN_WIDTH,
    paddingHorizontal: dynamicSize(35),
  },
  seperator: {
    height: SCREEN_HEIGHT * 0.02,
  },
  subscriptionTitle: {
    marginLeft: dynamicSize(35),
    fontSize: getFontSize(14),
    fontFamily: montserratSemiBold,
  },
  subscriptionContainer: {
    marginVertical: SCREEN_HEIGHT * 0.02,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: dynamicSize(5),
    borderColor: THEME,
    alignItems: 'center',
    width: SCREEN_WIDTH - dynamicSize(75),
    paddingVertical: dynamicSize(15),
    backgroundColor: WHITE,
  },
  subscriptionPrice: {
    fontFamily: montserratBold,
    fontSize: getFontSize(20),
  },
  subscriptionPeriod: {
    marginVertical: SCREEN_HEIGHT * 0.01,
    fontFamily: montserratMedium,
    fontSize: getFontSize(14),
  },
  subscriptionDescription: {
    fontFamily: montserratMedium,
    textAlign: 'center',
    fontSize: getFontSize(10),
  },
  subscriptionBuyDescription: {
    marginVertical: SCREEN_HEIGHT * 0.01,
    fontFamily: montserratMedium,
    textAlign: 'center',
    fontSize: getFontSize(15),
  },
  outerCurver: {
    backgroundColor: WHITE,
    width: SCREEN_WIDTH,
  },
  innerCurve: {
    borderTopLeftRadius: isAndroid ? dynamicSize(25) : dynamicSize(25),
    borderTopRightRadius: isAndroid ? dynamicSize(25) : dynamicSize(25),
    backgroundColor: WHITE,
    alignItems: 'center',
    height: '100%',
  },
  absoluteEditText: {
    right: dynamicSize(0),
    position: 'absolute',
    marginTop: isAndroid
      ? (SCREEN_HEIGHT * 0.16) / 2
      : (SCREEN_HEIGHT * 0.14) / 2,
  },
  lowerOuterCurver: {
    backgroundColor: LIGHT_WHITE,
    width: SCREEN_WIDTH,
  },
  lowerInnerCurve: {
    borderTopLeftRadius: isAndroid ? dynamicSize(25) : dynamicSize(25),
    borderTopRightRadius: isAndroid ? dynamicSize(25) : dynamicSize(25),
    backgroundColor: WHITE,
    alignItems: 'center',
    paddingTop: dynamicSize(15),
    // height: '100%'
  },
  ratingCount: {
    color: BLACK,
    fontSize: getFontSize(13),
    marginLeft: dynamicSize(10),
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
  portfolioFlatList: {
    width: SCREEN_WIDTH,
    paddingHorizontal: dynamicSize(25),
  },
  hairTypeFlatList: {
    paddingVertical: SCREEN_HEIGHT * 0.02,
    width: SCREEN_WIDTH,
    paddingHorizontal: dynamicSize(35),
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
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: SCREEN_WIDTH * 0.4,
    backgroundColor: LIGHT_BROWN,
    paddingHorizontal: dynamicSize(1),
    paddingVertical: dynamicSize(5),
    height: SCREEN_WIDTH * 0.1,
    marginTop: SCREEN_WIDTH * 0.05,
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
  },
  desc: {
    fontSize: getFontSize(10),
    marginTop: 5,
  },
  weekScheduleContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  arrowTouch: {
    paddingHorizontal: 10
  },
  weekdayText: {
    fontFamily: montserratSemiBold,
    fontSize: 11
  }
});

export default styles;
