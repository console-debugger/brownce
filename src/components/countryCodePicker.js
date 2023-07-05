import React from 'react'
import CountryPicker from 'react-native-country-picker-modal'

const MyCountryPicker = props =>{
   const {visible,onClose,onSelect} = props
    return(
        <CountryPicker
        {...{
           
        }}
        withCallingCode={true}
        withAlphaFilter={true}
        visible={visible}
        onClose={onClose}
        onSelect={onSelect}
      />
    )
}

export default MyCountryPicker
