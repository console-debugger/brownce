import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../components/helper';
import {BLACK, LIGHT_GRAY, THEME, WHITE} from '../../utils/colors';
import {dynamicSize, getFontSize} from '../../utils/responsive';
import {montserratSemiBold} from '../../utils/fontFamily';

const styles = StyleSheet.create({
  headerView: {
    height: SCREEN_HEIGHT * 0.12,
    backgroundColor: THEME,
    paddingHorizontal: dynamicSize(25),
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileImage: {
    height: SCREEN_HEIGHT * 0.085,
    width: SCREEN_HEIGHT * 0.085,
    borderRadius: (SCREEN_HEIGHT * 0.085) / 2,
  },
  shareImage: {
    height: SCREEN_HEIGHT * 0.025,
    width: SCREEN_HEIGHT * 0.025,
  },
  userDetailCon: {flex: 1, flexDirection: 'row'},
  userDetails: {
    paddingLeft: dynamicSize(20),
    flex: 2,
    justifyContent: 'center',
    paddingRight: dynamicSize(10),
  },
  shareImageCon: {
    flexDirection: 'row',
    paddingLeft: dynamicSize(20),
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    paddingRight: dynamicSize(10),
  },
  userName: {
    color: WHITE,
    fontFamily: montserratSemiBold,
    fontSize: getFontSize(16),
  },
  email: {
    color: WHITE,
    fontSize: getFontSize(12),
  },
  seperator: {
    height: dynamicSize(10),
  },
  flatList: {
    width: SCREEN_WIDTH,
  },
  menuItem: {
    paddingHorizontal: dynamicSize(25),
    flexDirection: 'row',
    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.07,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY,
  },
  providerMenu: {
    paddingHorizontal: dynamicSize(25),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.04,
  },
  labelStyle: {
    fontSize: getFontSize(13),
    fontFamily: montserratSemiBold,
    color: BLACK,
    marginLeft: dynamicSize(10),
  },
  arrowStyle: {
    right: dynamicSize(25),
    position: 'absolute',
  },
  starView: {
    paddingVertical: dynamicSize(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginTop: 2,
    fontFamily: montserratSemiBold,
    color: WHITE,
    fontSize: getFontSize(10),
    marginLeft: dynamicSize(5),
  },
});

export default styles;
