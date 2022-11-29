import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '../../components/helper';
import {BLACK, GRAY, THEME, WHITE} from '../../utils/colors';
import {montserratMedium} from '../../utils/fontFamily';
import {dynamicSize, getFontSize} from '../../utils/responsive';

const styles = StyleSheet.create({
  cardView: {
    marginTop: 15,
    paddingVertical: 12,
    width: '92%',
    borderRadius: 10,
    backgroundColor: WHITE,
    alignSelf: 'center',
  },
  topView: {
    width: '100%',
    borderBottomWidth: 0.8,
    borderBottomColor: GRAY,
    marginTop: 5,
  },
  insideView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal:dynamicSize(10),
    bottom: 10,
  },
  id: {
    fontWeight: 'bold',
    fontSize: getFontSize(13),
    width: '35%',
    color: BLACK,
  },
  date: {
    fontWeight: '500',
    marginLeft: 20,
    fontSize: getFontSize(13),
    color: GRAY,
    fontFamily: montserratMedium,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  contentContainer2: {
    flex: 1,
    marginLeft: 20,
    width: '70%',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 20,
  },
  title: {
    marginVertical: 5,
    fontSize: 13,
    fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
    // width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
    color: THEME,
    flex:1
    // width: '50%',
  },
  priceRow: {
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  secondaryText: {
    fontSize: getFontSize(13),
    color: GRAY,
    marginTop: 5,
  },
  descText: {
    color: BLACK,
    marginTop: 10,
    fontWeight: '500',
    fontSize: getFontSize(14),
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    alignItems: 'center',
  },
  cost: {
    fontSize: getFontSize(18),
    color: THEME,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  itineraryBtn: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: THEME,
  },
  msgText: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptytext: {
    fontSize: getFontSize(15),
    fontWeight: '700',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginVertical: 3,
  },
  complete: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingVertical: SCREEN_WIDTH * 0.01,
    backgroundColor: THEME,
    borderRadius: 20,
    // width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
