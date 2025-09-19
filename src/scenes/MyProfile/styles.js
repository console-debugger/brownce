import { StyleSheet } from 'react-native';
import {
  THEME,
  LIGHT_WHITE,
  WHITE,
  MID_GRAY,
  BLACK,
  LIGHT_BROWN,
  LIGHT_GRAY,
  GRAY,
  BLACK_30,
  BLACK_50,
} from '../../utils/colors';
import {
  interSemiBold,
  interMedium,
  interBold,
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
    fontFamily: interSemiBold,
    fontSize: getFontSize(16),
  },
  editText: {
    marginLeft: dynamicSize(3),
    color: THEME,
    fontFamily: interMedium,
    fontSize: getFontSize(14),
  },
  image: {
    alignSelf: 'center',
    width: isAndroid ? SCREEN_HEIGHT * 0.11 : SCREEN_HEIGHT * 0.11,
    height: isAndroid ? SCREEN_HEIGHT * 0.11 : SCREEN_HEIGHT * 0.11,
    borderRadius: (isAndroid ? SCREEN_HEIGHT * 0.11 : SCREEN_HEIGHT * 0.11) / 2,
  },
  name: {
    fontSize: getFontSize(18),
    fontFamily: interMedium
  },
  userName: {
    fontSize: getFontSize(14),
    fontFamily: interMedium,
    marginBottom: dynamicSize(8),
  },
  detail: {
    fontSize: getFontSize(12),
    marginBottom: dynamicSize(5),
    fontFamily: interSemiBold,
  },
  curveMain: {
    marginTop: SCREEN_HEIGHT * 0.02,
    backgroundColor: LIGHT_WHITE,
  },
  innerStyle: {
    backgroundColor: WHITE,
  },
  shareContainer: {
    paddingVertical: dynamicSize(5),
    paddingHorizontal: dynamicSize(20),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  lowerContainer: {
    flex: 1,
    paddingHorizontal: dynamicSize(20),
    width: SCREEN_WIDTH,
    backgroundColor: WHITE,
    paddingBottom: SCREEN_HEIGHT * 0.02
  },
  hairType: {
    // marginLeft: dynamicSize(35),
    fontFamily: interMedium,
    marginBottom: dynamicSize(10),
  },
  value: {
    fontFamily: interBold,
  },
  cardStyle: {
    borderWidth: 0.5,
    borderColor: GRAY,
    borderRadius: dynamicSize(5),
    paddingHorizontal: dynamicSize(15),
    paddingVertical: SCREEN_HEIGHT * 0.015,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  uploadText: {
    color: BLACK,
    fontFamily: interMedium,
    marginVertical: SCREEN_HEIGHT * 0.015,
  },
  description: {
    color: BLACK_50,
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  flatList: {
    paddingVertical: SCREEN_HEIGHT * 0.02,
  },
  seperator: {
    height: SCREEN_HEIGHT * 0.02,
  },
  subscriptionTitle: {
    marginLeft: dynamicSize(35),
    fontSize: getFontSize(14),
    fontFamily: interSemiBold,
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
    fontFamily: interBold,
    fontSize: getFontSize(20),
  },
  subscriptionPeriod: {
    marginVertical: SCREEN_HEIGHT * 0.01,
    fontFamily: interMedium,
    fontSize: getFontSize(14),
  },
  subscriptionDescription: {
    fontFamily: interMedium,
    textAlign: 'center',
    fontSize: getFontSize(10),
  },
  subscriptionBuyDescription: {
    marginVertical: SCREEN_HEIGHT * 0.01,
    fontFamily: interMedium,
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
    // marginVertical: dynamicSize(20),
    alignSelf: 'flex-start',
    marginLeft: dynamicSize(25),
    fontFamily: interBold,
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
    // justifyContent:'space-between',
    // width: SCREEN_WIDTH,
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
    fontFamily: interBold,
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
    fontFamily: interSemiBold,
    fontSize: 11
  },
  topTabContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: GRAY,
    flexDirection: 'row',
    // width: '100%',
    marginHorizontal: dynamicSize(15)
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE
  },
  tabText: {
    fontSize: 9,
    fontFamily: interBold
  },
  absoluteCamera: {
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    right: 0
  },
  nameContainer: {
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  eachProfileDetailCard: {
    flexDirection: 'row',
    width: SCREEN_WIDTH - 40,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BLACK_30
  },
  detailLabel: {
    flex: 1,
    fontSize: getFontSize(13),
    fontFamily: interMedium
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  }
});

export default styles;
