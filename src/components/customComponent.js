import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import MultiSelect from 'react-native-multiple-select';
import { TextInputLayout } from 'rn-textinputlayout';
import {
  TRANSPARENT_BLACK,
  THEME,
  PLACEHOLDER_COLOR,
  LIGHT_WHITE,
  LIGHT_GRAY,
  BLACK,
  LIGHT_BROWN,
  TRANSPARENT_LIGHT_BLACK,
  WHITE,
  MID_GRAY,
} from '../utils/colors';
import commonStyle from './commonStyle';
import { dismissKeyboard, SCREEN_HEIGHT, SCREEN_WIDTH, isIOS, checkDialCodePlusSymbol } from './helper';
import { getFontSize, dynamicSize } from '../utils/responsive';
import { useSelector } from 'react-redux';
import {
  montserrat,
  montserratBold,
  montserratSemiBold,
  montserratMedium,
} from '../utils/fontFamily';
import {
  arrowForeward,
  downArrow,
  inactiveSearchIcon,
  mediumStarIcon,
  activeSearchIcon,
  largeStarIcon,
  smallStar,
  inactiveLargeStarIcon,
  deleteIcon,
  like,
  likeBlack,
  dislike,
  dislikeBlack,
  filterIcon,
} from './icons';
import Slider from 'react-native-slider';
import { editIcon } from '../components/icons';
import { Pagination } from 'react-native-snap-carousel';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';

export const SafeArea = (props) => {
  const { children, style } = props;
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: LIGHT_WHITE }, style]}>
      {children}
    </SafeAreaView>
  );
};

export const MyView = (props) => {
  const { children, style, onLayout } = props;
  return (
    <View {...props} onLayout={onLayout} style={style}>
      {children}
    </View>
  );
};

export const MyImage = (props) => {
  const { source, resizeMode, style } = props;
  return (
    <Image {...props} source={source} resizeMode={resizeMode} style={style} />
  );
};

export const KeyboardAwareScroll = (props) => {
  const { children, style, contentContainerStyle, scrollEnabled } = props;

  const _disableKeyboard = () => dismissKeyboard;

  return (
    <MyView style={[commonStyle['commonContainer'], style]}>
      <TouchableWithoutFeedback onPress={_disableKeyboard}>
        <KeyboardAwareScrollView
          scrollEnabled={scrollEnabled}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={20}
          enableOnAndroid={true}
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}>
          {children}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </MyView>
  );
};

export const Touchable = (props) => {
  const {
    children,
    activeOpacity,
    style,
    onPress,
    disabled,
    onPressIn,
    onPressOut,
  } = props;
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={activeOpacity}
      style={style}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export const TouchableIcon = (props) => {
  const {
    onPress,
    source,
    style,
    resizeMode,
    imageStyle,
    disabled,
    activeOpacity,
    indicator,
    indicatorContainerStyle,
  } = props;
  return (
    <Touchable
      {...props}
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={onPress}
      style={style}>
      {indicator ? (
        <MyView
          style={[
            style,
            { position: 'absolute', zIndex: 5 },
            indicatorContainerStyle,
          ]}>
          <MyIndicator />
        </MyView>
      ) : (
        <MyImage source={source} resizeMode={resizeMode} style={imageStyle} />
      )}
    </Touchable>
  );
};

export const MyText = (props) => {
  const { children, style, onPress, onTextlayout, textRefs } = props;
  return (
    <Text
      {...props}
      ref={textRefs}
      onTextlayout={onTextlayout}
      onPress={onPress}
      style={[{ fontFamily: montserrat, fontSize: getFontSize(12) }, style]}>
      {children}
    </Text>
  );
};

export const CustomModal = (props) => {
  const { isVisible, children, style, animationType } = props;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animationType || 'fade'}
      onRequestClose={() => console.log('On request close pressed.')}>
      <MyView
        style={[
          {
            flex: 1,
            height: SCREEN_HEIGHT,
            backgroundColor: isIOS
              ? TRANSPARENT_BLACK
              : TRANSPARENT_LIGHT_BLACK,
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}>
        {children}
      </MyView>
    </Modal>
  );
};

export const CustomModal1 = (props) => {
  const { isVisible, children, style, animationType } = props;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animationType || 'fade'}
      onRequestClose={() => console.log('On request close pressed.')}>
      <TouchableWithoutFeedback
        style={{
          flex: 1,
          height: SCREEN_HEIGHT,
          backgroundColor: isIOS ? TRANSPARENT_BLACK : TRANSPARENT_LIGHT_BLACK,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={props.dismiss}>
        <MyView
          style={[
            {
              flex: 1,
              height: SCREEN_HEIGHT,
              backgroundColor: isIOS
                ? TRANSPARENT_BLACK
                : TRANSPARENT_LIGHT_BLACK,
              alignItems: 'center',
              justifyContent: 'center',
            },
            style,
          ]}>
          {children}
        </MyView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const SearchLoader = (props) => {
  const { isVisible, children, style, animationType } = props;

  return (
    <MyView
      style={[
        {
          marginVertical: SCREEN_HEIGHT * 0.3,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      {children}
    </MyView>
  );
};

export const Button = (props) => {
  const {
    text,
    onPress,
    style,
    textStyle,
    disabled,
    icon,
    iconStyle,
    iconImageStyle,
    indicator,
    color,
    avoidLowerCase
  } = props;
  const state = useSelector((state) => {
    return state;
  });
  const { SUBMIT } = state['localeReducer']['locale'];

  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      style={[commonStyle['commonButtonContainer'], style]}>
      {indicator ? <ActivityIndicator color={color || WHITE} size='small' />
        :
        <MyText style={[commonStyle['commonButtonText'], textStyle]}>
          {text ? avoidLowerCase ? text : text.toString().toUpperCase() : '' || SUBMIT}
        </MyText>
      }
      {icon && (
        <TouchableIcon
          disabled
          source={icon}
          style={iconStyle}
          imageStyle={iconImageStyle}
          resizeMode="contain"
        />
      )}
    </Touchable>
  );
};

export const Input = React.forwardRef((props, ref) => {
  const {
    errorStyle,
    styleContainer,
    editable,
    onPress,
    textInputStyle,
    clearButtonMode,
    containerStyle,
    errorMessage,
    text,
    hintColor,
    labelFontSize,
    placeholder,
    source,
    style,
    returnKeyType,
    noteTextStyle,
    noteText,
  } = props;

  const state = useSelector((state) => {
    return state;
  });
  const { NOTE } = state['localeReducer']['locale'];

  return (
    <MyView style={styleContainer}>
      <MyView style={[commonStyle['textFieldContainer'], style]}>
        {source && (
          <MyView style={commonStyle['textFieldImageContainer']}>
            <MyImage source={source} resizeMode="contain" />
          </MyView>
        )}
        <TextInputLayout
          style={[
            commonStyle['inputLayout'],
            {
              width: source ? '85%' : '100%',
              marginLeft: source ? dynamicSize(5) : 0,
            },
            containerStyle,
          ]}
          focusColor={THEME}
          hintColor={hintColor || PLACEHOLDER_COLOR}
          labelFontSize={labelFontSize ? labelFontSize : getFontSize(12)}>
          <TextInput
            {...props}
            ref={ref}
            editable={editable}
            clearButtonMode={clearButtonMode ? 'never' : 'while-editing'}
            placeholderTextColor={PLACEHOLDER_COLOR}
            style={[commonStyle['textInput'], { width: '100%' }, textInputStyle]}
            placeholder={placeholder || ''}
            returnKeyType={returnKeyType || 'next'}
          />
        </TextInputLayout>
        {text && (
          <Touchable onPress={onPress} style={commonStyle['emailtextField']}>
            <MyText style={{ color: THEME, textDecorationLine: 'underline' }}>
              {text}
            </MyText>
          </Touchable>
        )}
      </MyView>
      {noteText && (
        <MyText style={[commonStyle['note'], noteTextStyle]}>
          {NOTE} : -{' '}
          <MyText style={[commonStyle['noteText'], noteTextStyle]}>
            {noteText}{' '}
          </MyText>
        </MyText>
      )}
      {errorMessage !== '' && (
        <MyView style={{ width: SCREEN_WIDTH - dynamicSize(70) }}>
          <MyText
            style={[
              commonStyle['errorMessage'],
              { width: source ? '88%' : '100%' },
              errorStyle,
            ]}>
            {errorMessage}
          </MyText>
        </MyView>
      )}
    </MyView>
  );
});

export const Selection = (props) => {
  const {
    source,
    label,
    labelStyle,
    imageStyle,
    style,
    onPress,
    children,
  } = props;
  return (
    <Touchable
      activeOpacity={0.7}
      style={[commonStyle['selectionView'], style]}
      onPress={onPress}>
      <MyImage source={source} resizeMode="contain" style={imageStyle} />
      <MyText style={[commonStyle['selectionText'], labelStyle]}>
        {label}
      </MyText>
      {children}
    </Touchable>
  );
};

export const SecondaryButton = (props) => {
  const {
    onPress,
    text,
    style,
    Icon,
    textStyle,
    price,
    pricetext,
    iconStyle,
  } = props;
  return (
    <Touchable
      activeOpacity={1}
      onPress={onPress}
      style={[commonStyle['secondaryButton'], style]}>
      <MyText style={[commonStyle['secondaryText'], textStyle]}>{text}</MyText>
      {price && (
        <MyText style={[commonStyle['secondaryText'], textStyle]}>
          {pricetext}
        </MyText>
      )}
      {Icon && <MyImage source={editIcon} style={iconStyle} />}
    </Touchable>
  );
};

export const Card = (props) => {
  const { children, style } = props;
  return <MyView style={[commonStyle['cardStyle'], style]}>{children}</MyView>;
};

export const MultilineTextInput = React.forwardRef((props, ref) => {
  const { style, editable, value, onChangeText, onBlur } = props;
  return (
    <TextInput
      {...props}
      multiline
      ref={ref}
      onBlur={props.onBlur}
      editable={editable}
      style={[commonStyle['multiTextInput'], style]}
      value={props.value}
      onChangeText={props.onChangeText}
    />
  );
});

export const DrawerTile = (props) => {
  const { text, source, style, onPress } = props;
  return (
    <Touchable
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          width: SCREEN_WIDTH - dynamicSize(70),
          justifyContent: 'space-between',
          alignItems: 'center',
          height: dynamicSize(50),
          backgroundColor: LIGHT_WHITE,
          paddingHorizontal: dynamicSize(20),
        },
        style,
      ]}>
      <MyText
        style={{ fontFamily: montserratSemiBold, fontSize: getFontSize(16) }}>
        {text}
      </MyText>
      <MyImage source={source ? source : arrowForeward} />
    </Touchable>
  );
};

export const CurveView = (props) => {
  const { style, innerStyle, children } = props;
  return (
    <MyView style={[commonStyle['outerCurver'], style]}>
      <MyView style={[commonStyle['innerCurve'], innerStyle]} >
        {children}
      </MyView>
    </MyView>
  );
};

export const CustomDropDown = (props) => {
  const {
    placeholderTextColor,
    errorMessage,
    data,
    label,
    value,
    error,
    onChange,
    style,
    placeholder,
    icon,
    containerStyle,
    topOffset,
  } = props;
  const state = useSelector((state) => {
    return state;
  });
  const { PLEASE_SELECT } = state['localeReducer']['locale'];

  const _renderIcon = () => {
    return (
      <MyImage
        source={downArrow}
        resizeMode="contain"
        style={{ marginVertical: dynamicSize(5), marginLeft: dynamicSize(2) }}
      />
    );
  };

  return (
    <Dropdown
      {...props}
      placeholderTextColor={placeholderTextColor || LIGHT_GRAY}
      value={value}
      dropdownOffset={{ top: topOffset || SCREEN_WIDTH * 0.014, left: 0 }}
      labelTextStyle={{ fontFamily: montserratSemiBold, color: LIGHT_GRAY }}
      itemTextStyle={{ fontFamily: montserratSemiBold }}
      containerStyle={[commonStyle['dropDownContainer'], style]}
      labelFontSize={label ? getFontSize(12) : 0}
      fontSize={getFontSize(14)}
      fontFamily={montserratSemiBold}
      baseColor={BLACK}
      label={label || ''}
      itemColor={BLACK}
      textColor={BLACK}
      data={data}
      selectedItemColor={THEME}
      inputContainerStyle={[
        { borderBottomColor: LIGHT_GRAY, borderBottomWidth: 1 },
        containerStyle,
      ]}
      renderAccessory={icon || _renderIcon}
      placeholder={placeholder || PLEASE_SELECT}
      onChangeText={onChange}
      error={errorMessage}
    />
  );
};

export const SearchInput = (props) => {
  const state = useSelector((state) => {
    return state;
  });
  const { SEARCH } = state['localeReducer']['locale'];
  const { placeholder, style, showFilter, rightSource, onRightPress, children } = props;
  return (
    <MyView style={[commonStyle['searchView'], style]}>
      <MyImage
        source={activeSearchIcon}
        resizeMode="contain"
        style={{ width: dynamicSize(20), height: dynamicSize(20) }}
      />
      <TextInput
        {...props}
        style={commonStyle['searchInput']}
        placeholder={placeholder || SEARCH}
        placeholderTextColor="lightgrey"
        clearButtonMode="while-editing"
        returnKeyType="search"
      />
      {showFilter ?
        <TouchableIcon
          style={{
            backgroundColor: THEME,
            padding: dynamicSize(10),
            borderRadius: dynamicSize(50)
          }}
          source={rightSource || filterIcon}
          onPress={onRightPress}
        />
        :
        null}
    </MyView>
  );
};

export const QuestionsView = (props) => {
  const {
    source,
    question,
    date,
    name,
    replyCount,
    onPicPress,
    onReplyPress,
    showDelete,
    onDeletePress,
    isLiked,
    isDisliked,
    onLikePress,
    onDisLikePress,
    likeCount,
    dislikeCount,
    onEditPress,
  } = props;
  return (
    <MyView style={commonStyle['questionsMainContainer']}>
      <TouchableIcon
        source={source}
        onPress={onPicPress}
        imageStyle={commonStyle['questionsImageStyle']}
      />
      <MyView style={commonStyle['questionsRightContainer']}>
        <MyView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <MyText numberOfLines={1} style={commonStyle['questionsName']}>
            {question.trim()}
          </MyText>
          <MyText style={commonStyle['questionsDate']}>{date}</MyText>
        </MyView>
        <MyText style={commonStyle['questionsDate']}>{name}</MyText>
        <Touchable onPress={onReplyPress} style={{ flexDirection: 'row' }}>
          <MyText style={{ fontFamily: montserratMedium }} numberOfLines={1}>
            {`${replyCount} Replies`}{' '}
          </MyText>
          <MyImage source={arrowForeward} />
        </Touchable>
        <MyView
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '20%',
            alignItems: 'center',
          }}>
          <TouchableIcon
            source={isLiked ? likeBlack : like}
            style={{ height: dynamicSize(20), aspectRatio: 1 }}
            imageStyle={{ height: '100%', width: '100%' }}
            onPress={onLikePress}
          />
          <MyText
            style={{
              fontFamily: montserratMedium,
              fontSize: getFontSize(16),
              marginHorizontal: dynamicSize(5),
            }}
            numberOfLines={1}>
            {likeCount || 0}{' '}
          </MyText>
          {/* <TouchableIcon
                        source={isDisliked ? dislikeBlack : dislike}
                        style={{ height: dynamicSize(20), aspectRatio: 1 }}
                        imageStyle={{ height: '100%', width: '100%' }}
                        onPress={onDisLikePress}
                    />
                    <MyText style={{ fontFamily: montserratMedium, fontSize: getFontSize(16), marginHorizontal: dynamicSize(5), }} numberOfLines={1} >{dislikeCount || 0} </MyText> */}
        </MyView>
      </MyView>
      {showDelete && (
        <TouchableIcon
          source={deleteIcon}
          style={{
            position: 'absolute',
            height: dynamicSize(20),
            aspectRatio: 1,
            right: 0,
            bottom: dynamicSize(10),
          }}
          imageStyle={{ height: '100%', width: '100%' }}
          onPress={onDeletePress}
        />
      )}
      {showDelete && (
        <TouchableIcon
          source={editIcon}
          style={{
            position: 'absolute',
            height: dynamicSize(20),
            aspectRatio: 1,
            right: 0,
            bottom: dynamicSize(40),
          }}
          imageStyle={{ height: '100%', width: '100%' }}
          onPress={onEditPress}
        />
      )}
    </MyView>
  );
};

export const CustomSlider = (props) => {
  const {
    value,
    onValueChange,
    minimumValue,
    maximumValue,
    onSlidingComplete,
    step,
    style
  } = props;
  return (
    <Slider
      style={[{ width: SCREEN_WIDTH - dynamicSize(70) }, style]}
      trackStyle={{ height: dynamicSize(8), borderRadius: dynamicSize(20) }}
      value={value}
      onSlidingComplete={onSlidingComplete}
      onValueChange={onValueChange}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      minimumTrackTintColor={THEME}
      maximumTrackTintColor={LIGHT_GRAY}
      step={step}
      // thumbStyle={{ width: dynamicSize(100), height: dynamicSize(100) }}
      // thumbTouchSize={{ width: dynamicSize(100), height: dynamicSize(100) }}
      thumbStyle={{ backgroundColor: LIGHT_BROWN }}
    />
  );
};

export const MyIndicator = (props) => {
  const { size, color, verticalSpace, style } = props;
  return (
    <MyView
      style={[{ marginVertical: verticalSpace ? dynamicSize(15) : 0 }, style]}>
      <ActivityIndicator size={size || 'small'} color={color || THEME} />
    </MyView>
  );
};

export const Loader = (props) => {
  const { isVisible, style } = props;

  return (
    <CustomModal isVisible={isVisible} style={style}>
      <MyIndicator color={THEME} />
    </CustomModal>
  );
};
export const LoaderSearch = (props) => {
  const { isVisible, style } = props;
  if (isVisible) {
    return (
      <SearchLoader style={style}>
        <MyIndicator color={THEME} />
      </SearchLoader>
    );
  } else {
    return null;
  }
};

export const OtpInput = React.forwardRef((props, ref) => {
  const {
    onKeyPress,
    onChangeText,
    onFocus,
    onBlur,
    returnKeyType,
    returnTypeLabel,
    style,
    onSubmitEditing,
    blurOnSubmit,
    autoFocus,
  } = props;
  return (
    <View style={[commonStyle['optContainer'], style]}>
      <TextInput
        ref={ref}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        style={commonStyle['otptextStyle']}
        keyboardType="phone-pad"
        maxLength={1}
        autoFocus={autoFocus}
        onKeyPress={onKeyPress}
        blurOnSubmit={blurOnSubmit}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType || 'next'}
        returnKeyLabel={returnTypeLabel || 'next'}
      />
    </View>
  );
});

export const EmptyMessage = (props) => {
  const { message, key, style } = props;
  return (
    <MyText key={key} style={[commonStyle['emptyMessageStyle'], style]}>
      {' '}
      {message || ''}
    </MyText>
  );
};

export const ShowStarRating = (props) => {
  const { rating, large, imageStyle, style, isRate, appliedRating } = props;
  const [selectedRate, setRating] = useState(0);

  useEffect(() => {
    if (!rating && appliedRating) appliedRating(0)
  }, []);

  let stars = [];

  const _selectStar = (index) => () => {
    setRating(index);
    if (appliedRating) appliedRating(index);
  };

  for (var i = 1; i <= 5; i++) {
    let path = large ? mediumStarIcon : smallStar;
    if (i > parseInt(rating ? rating : selectedRate)) {
      path = large ? inactiveLargeStarIcon : inactiveLargeStarIcon;
    }
    stars.push(
      <TouchableIcon
        key={i}
        disabled={isRate ? false : true}
        activeOpacity={1}
        onPress={_selectStar(i)}
        source={path}
        resizeMode="contain"
        imageStyle={imageStyle}
      />,
    );
  }

  return (
    <MyView
      style={[{ alignItems: 'center', flexDirection: 'row', bottom: 4 }, style]}>
      {stars}
    </MyView>
  );
};

export const RatingWithLabel = (props) => {
  const { label, labelStyle, rating, childern, style, isRateCount } = props;

  return (
    <MyView style={[commonStyle['ratingRow'], style]}>
      <MyText style={[commonStyle['labelText'], labelStyle]}>{label}</MyText>
      <MyView style={{ flexDirection: 'row', alignItems: 'center' }}>
        {!isRateCount ? (
          <>
            <ShowStarRating {...props} large rating={rating} />
            {childern}
          </>
        ) : (
          <>
            <MyView style={commonStyle['starView']}>
              <MyImage source={mediumStarIcon} />
              <MyText style={commonStyle['ratingCount']}>{props.mytext}</MyText>
            </MyView>
          </>
        )}
      </MyView>
    </MyView>
  );
};

export const RatingWithLabel1 = (props) => {
  const { label, labelStyle, rating, childern, style, isRateCount } = props;

  return (
    <MyView style={[commonStyle['ratingRow2'], style]}>
      <MyText style={[commonStyle['labelText'], labelStyle]}>{label}</MyText>
      <MyView style={{ flexDirection: 'row', alignItems: 'center' }}>
        {!isRateCount ? (
          <>
            <ShowStarRating {...props} large rating={rating} />
            {childern}
          </>
        ) : (
          <>
            <MyView style={commonStyle['starView']}>
              <MyImage source={mediumStarIcon} />
              <MyText style={commonStyle['ratingCount']}>{'4/5'}</MyText>
            </MyView>
          </>
        )}
      </MyView>
    </MyView>
  );
};

export const NotificationPopup = (props) => {
  const { count } = props;

  const _getCount = () => {
    if (count > 100) return '100+';
    else return count;
  };

  return (
    <MyView style={commonStyle.notiPopupContainer}>
      <MyView style={commonStyle.squareBox}>
        <MyText style={commonStyle.notiCount}>{_getCount() || 0}</MyText>
      </MyView>
      <MyView style={commonStyle.triangleDown} />
    </MyView>
  );
};

export const MultiSelectDropdown = forwardRef((props, ref) => {
  const { inputContainerStyle, uniqueKey, displayKey, items, onSelectedItemsChange, selectedItems, onChangeInput, topWrapperStyle, hideSelectedTag, selectText } = props

  const state = useSelector((state) => {
    return state;
  });
  const { SEARCH, SUBMIT } = state['localeReducer']['locale'];

  const multiSelectDropdownRef = useRef()

  let updatedRef = ref || multiSelectDropdownRef

  const _onSelectedItemsChange = data => {
    if (onSelectedItemsChange) onSelectedItemsChange(data)
  }

  return (
    <MyView style={[{ width: '100%' }, topWrapperStyle, inputContainerStyle]}>
      <MultiSelect
        hideTags
        // hideSubmitButton
        items={items || []}
        uniqueKey={uniqueKey || "id"}
        // fixedHeight={true}
        ref={updatedRef}
        hideDropdown={false}
        searchIcon={<MyImage source={activeSearchIcon}
          resizeMode="contain"
          style={{ width: dynamicSize(20), height: dynamicSize(20) }} />}
        onSelectedItemsChange={_onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText={selectText}
        searchInputPlaceholderText={SEARCH}
        onChangeInput={onChangeInput}
        altFontFamily={montserrat}
        selectedItemFontFamily={montserrat}
        itemFontFamily={montserrat}
        tagRemoveIconColor={THEME}
        tagBorderColor={THEME}
        tagTextColor={THEME}
        selectedItemTextColor={THEME}
        selectedItemIconColor={THEME}
        itemTextColor={BLACK}
        displayKey={displayKey || "name"}
        searchInputStyle={{ paddingLeft: dynamicSize(10), borderWidth: 0 }}
        itemFontSize={getFontSize(13)}
        submitButtonColor={THEME}
        submitButtonText={SUBMIT}
        styleTextDropdown={{ color: THEME, }}
        textColor={LIGHT_BROWN}
        styleRowList={{ backgroundColor: WHITE }}
        styleMainWrapper={commonStyle.multiMainWrapperStyle}
        styleSelectorContainer={{ marginBottom: 0 }}
        styleIndicator={{ color: THEME }}
        styleInputGroup={commonStyle.multiInput}
        styleDropdownMenu={{ height: dynamicSize(37), width: SCREEN_WIDTH - dynamicSize(70) }}
        styleTextTag={{ fontSize: getFontSize(12), margin: 0, padding: 0 }}
        tagContainerStyle={{ height: null }}
        styleTextDropdownSelected={{ fontSize: getFontSize(13) }}
        styleDropdownMenuSubsection={commonStyle.styleDropdownMenuSubsection}

      />
      {!hideSelectedTag ? selectedItems?.length ? updatedRef?.current?.getSelectedItemsExt(selectedItems) : null : null}
    </MyView>
  )

})

export const MyPagination = props => {
  const { length, activeSlideIndex } = props
  return (
    <Pagination
      dotsLength={length}
      activeDotIndex={activeSlideIndex}
      dotContainerStyle={{ marginHorizontal: dynamicSize(1) }}
      containerStyle={{
        paddingVertical: dynamicSize(10),
      }}
      dotStyle={{
        width: 15,
        height: 15,
        borderRadius: 10,
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginHorizontal: 0,
        backgroundColor: THEME
      }}
      inactiveDotStyle={{
        backgroundColor: 'grey'
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={1}
    />
  )
}

export const MobileInput = forwardRef((props, ref) => {
  const { textContentType, mainContainerStyle, returnKeyType, countryCodeTextStyle, errorMessage, style, source, countryCode, rightIcon, onPress, fieldstyle, onRightPress, value, onChangeText, keyboardType, rightIconStyle, rightIconImageStyle } = props
  return (
    <MyView style={mainContainerStyle}>
      <MyView style={[commonStyle['textField'], fieldstyle]}>
        {source && <MyImage resizeMode={'contain'} source={source} />}
        {!!countryCode && <Touchable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: isIOS ? dynamicSize(7) : 0 }}>
          <MyText style={[{ marginLeft: 8, fontFamily: montserratSemiBold, fontSize: getFontSize(14) }, countryCodeTextStyle]}>{checkDialCodePlusSymbol(countryCode)}</MyText>
          <MyImage style={{ margin: 5 }} source={downArrow} />
        </Touchable>
        }
        <TextInput {...props}
          ref={ref}
          textContentType={textContentType}
          style={[commonStyle['textInput'], { flex: 1, paddingBottom: dynamicSize(10) }, style]}
          underlineColorAndroid={'transparent'}
          placeholderTextColor={PLACEHOLDER_COLOR}
          autoCorrect={false}
          spellCheck={false}
          allowFontScaling={false}
          value={value}
          maxLength={14}
          onChangeText={onChangeText}
          returnKeyType={returnKeyType || 'done'}
          keyboardType={keyboardType || 'number-pad'}
        />
        {rightIcon && <Touchable style={rightIconStyle} onPress={onRightPress}>
          <MyImage source={rightIcon} style={rightIconImageStyle} />
        </Touchable>}

      </MyView>
      {errorMessage?.length ? <MyView style={{ width: SCREEN_WIDTH - dynamicSize(52) }}>
        <MyText style={[commonStyle.errorMessage]}>{errorMessage}</MyText>
      </MyView> : null}
    </MyView>
  )
})

export const Triangle = props => {
  const size = props?.size || 20
  return (<View style={[commonStyle.triangle, {
    borderLeftWidth: size / 2,
    borderRightWidth: size / 2,
    borderBottomWidth: size,
  }, props.style]} />)
}

export const WeekDayTimings = props => {
  const { jumpToNextWeek, jumpToPreviousWeek, text } = props

  return (
    <MyView style={commonStyle.weekScheduleContainer}>
      <Touchable style={commonStyle.weekScheduleArrowTouch} onPress={jumpToPreviousWeek}>
        <Triangle size={15} style={{ transform: [{ rotate: "-90deg" }] }} />
      </Touchable>
      <MyText style={commonStyle.weekdayText}>{text}</MyText>
      <Touchable style={commonStyle.weekScheduleArrowTouch} onPress={jumpToNextWeek}>
        <Triangle size={15} style={{ transform: [{ rotate: "90deg" }] }} />
      </Touchable>
    </MyView>
  )
}

export const NormalInput = forwardRef((props, ref) => {
  const { containerStyle, style } = props
  return (
    <MyView style={containerStyle}>
      <TextInput
        {...props}
        ref={ref}
        style={[{ flex: 1, backgroundColor: WHITE, paddingHorizontal: 10, paddingVertical: 7 }, style]}
      />
    </MyView>
  )
})

export const PopupMenuOption = ({
  optionData = [],
  customOptionUI,
  optionsContainerStyle,
  onSelect,
  children,
  optionKey = 'name',
  scrollviewStyle,
  isPopOver,
  disabled
}) => {
  const { Popover } = renderers
  const menuOptionsUI = (
    <MenuOptions
      optionsContainerStyle={[
        {
          padding: 10,
          borderRadius: 10,
          paddingBottom: 10
        },
        optionsContainerStyle,
      ]}>
      <ScrollView
        style={[{ maxHeight: 150 }, scrollviewStyle]}
      >
        {optionData.map((item, index) => {
          return customOptionUI ? (
            customOptionUI(item, index)
          ) : (
            <MenuOption key={index.toString()} onSelect={onSelect(item)}>
              <MyText>{item[optionKey]}</MyText>
            </MenuOption>
          );
        })}
      </ScrollView>
    </MenuOptions>
  )

  return isPopOver ? (
    <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }} >
      <MenuTrigger disabled={disabled} >{children}</MenuTrigger>
      {menuOptionsUI}
    </Menu>
  )
    :
    (<Menu>
      <MenuTrigger disabled={disabled}>{children}</MenuTrigger>
      {menuOptionsUI}
    </Menu>
    );
};

export const NewThemeInput = forwardRef((props, ref) => {
  const { source, inputStyle, errorMessage, errorStyle, mainContainerStyle, containerStyle, rightLabel, onRightPress, value, textOnly, onTextPress, rightLabelStyle, sourceStyle } = props
  return (
    <MyView style={mainContainerStyle}>
      <MyView style={[{ flexDirection: 'row', backgroundColor: WHITE, borderRadius: 5, width: SCREEN_WIDTH - dynamicSize(70), paddingVertical: 10, paddingHorizontal: 5 }, containerStyle]}>
        {!!source && <MyImage source={source} style={[{ marginRight: 10 }, sourceStyle]} resizeMode='contain' />}
        {textOnly ?
          <MyText
            onPress={onTextPress}
            style={[{ flex: 1, fontFamily: montserratSemiBold, fontSize: 13 }, inputStyle]}
          >{value}</MyText>
          :
          <TextInput
            ref={ref}
            style={[{ flex: 1, borderBottomColor: 'transparent', fontFamily: montserratSemiBold, fontSize: 14 }, inputStyle]}
            {...props}
          />
        }
        <MyText onPress={onRightPress} style={[{ marginLeft: 10, fontSize: 13, fontFamily: montserratMedium }, rightLabelStyle]}>{rightLabel}</MyText>
      </MyView>
      {!!errorMessage && (
        <MyView style={{ width: SCREEN_WIDTH - dynamicSize(70) }}>
          <MyText
            style={[
              commonStyle['errorMessage'],
              { width: '100%' },
              errorStyle,
            ]}>
            {errorMessage}
          </MyText>
        </MyView>
      )}
    </MyView>
  )
})

export const NewThemeDropdown = (props) => {
  const {
    source,
    placeholderTextColor,
    label,
    style,
    containerStyle,
    errorMessage,
    errorStyle,
    mainContainerStyle,
    onChange,
    placeholder,
    value,
    topOffset,
    data = [],
    icon
  } = props

  const state = useSelector((state) => {
    return state;
  });
  const { PLEASE_SELECT } = state['localeReducer']['locale'];

  const _renderIcon = () => {
    return (
      <MyImage
        source={downArrow}
        resizeMode="contain"
        style={{ marginVertical: dynamicSize(5), marginLeft: dynamicSize(2) }}
      />
    );
  };

  return (
    <MyView style={[{ flex: 1 }, mainContainerStyle]}>
      <MyView style={{ flexDirection: 'row', backgroundColor: WHITE, borderRadius: 5, width: SCREEN_WIDTH - dynamicSize(70), paddingVertical: 5, paddingHorizontal: 5 }}>
        {!!source && <MyImage source={source} style={{ marginRight: 10, width: 30, height: 30 }} resizeMode='contain' />}
        <Dropdown
          {...props}
          placeholderTextColor={placeholderTextColor || LIGHT_GRAY}
          value={value}
          dropdownOffset={{ top: topOffset || SCREEN_WIDTH * 0.014, left: 0 }}
          labelTextStyle={{ fontFamily: montserratSemiBold, color: LIGHT_GRAY }}
          itemTextStyle={{ fontFamily: montserratSemiBold }}
          containerStyle={[commonStyle['dropDownContainer'], { width: null, flex: 1 }, style]}
          labelFontSize={label ? getFontSize(12) : 0}
          // pickerStyle={{ width: SCREEN_WIDTH - dynamicSize(70) }}
          dropdownPosition={0}
          fontSize={getFontSize(14)}
          fontFamily={montserratSemiBold}
          baseColor={BLACK}
          label={label || null}
          itemColor={BLACK}
          textColor={BLACK}
          labelHeight={0}
          data={data}
          disabledLineType={'none'}
          selectedItemColor={THEME}
          inputContainerStyle={[
            { borderBottomColor: 'transparent', borderBottomWidth: 0 },
            containerStyle,
          ]}
          renderAccessory={icon || _renderIcon}
          placeholder={placeholder || PLEASE_SELECT}
          onChangeText={onChange}
        // error={errorMessage}
        />
      </MyView>
      {!!errorMessage && (
        <MyView style={{ width: SCREEN_WIDTH - dynamicSize(70) }}>
          <MyText
            style={[
              commonStyle['errorMessage'],
              { width: '100%' },
              errorStyle,
            ]}>
            {errorMessage}
          </MyText>
        </MyView>
      )}
    </MyView>
  )
}