import appConstants from '../locale/en.json'

export const validateEmail = email => {
    const emailRegex = /^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i;
    email = email.trim();
    if (email == "" || email == undefined || email == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_AN_EMAIL'] };
    }
    else if (!emailRegex.test(email)) {
        return { status: false, error: appConstants['PLEASE_ENTER_VALID_EMAIL'] };
    }
    else {
        return { status: true, error: '' };
    }
}

export const validatePaypalEmail = email => {
    email = email.trim();
    if (email == "" || email == undefined || email == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_AN_EMAIL'] };
    }

    else {
        return { status: true, error: '' };
    }
}
export const validatePassword = password => {
    password = password.trim();

    if (password == "" || password == undefined || password == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_PASSWORD'], error1: "Please enter new password" }
    }
    else {
        return { status: true, error: '' }
    }
}

export const validateConfpassword = (password, confPassword) => {
    if (confPassword == "" || confPassword == undefined || confPassword == null) {
        return { status: false, error: 'Please enter confirm password' }
    }
    if (password === confPassword) {
        return { status: true, error: '' }
    }
    else return { status: false, error: appConstants['MATCH_PASSWORD'] }
}

export const validateConfpassword1 = (password, confPassword) => {
    if (confPassword == "" || confPassword == undefined || confPassword == null) {
        return { status: false, error: 'Please enter confirm password' }
    }
    if (password === confPassword) {
        return { status: true, error: '' }
    }
    else return { status: false, error: 'New password and confirm password doesnt match.' }
}

export const requireEmail = email => {
    email = email?.toString()?.trim()
    if (email == '' || email == undefined || email == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_AN_EMAIL'] };
    }
    else return { status: true, error: '' }
}

export const requireUsername = username => {
    username = username?.toString()?.trim()
    if (username == '' || username == undefined || username == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_AN_USERNAME'] };
    }
    else return { status: true, error: '' }
}

export const requirePassword = password => {
    password = password?.toString()?.trim()
    if (password == "" || password == undefined || password == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_PASSWORD'] }
    }
    else return { status: true, error: '' }
}

export const validateMobileNo = mobileNo => {
    const numRegExWithCode = /^\+(?:[0-9] ?){10,12}[0-9]$/
    // var numRegExWithCode = /^[1-9][0-9]{9,12}$/;
    mobileNo = mobileNo.trim()
    if (mobileNo == "" || mobileNo == undefined || mobileNo == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_PHONE_NUMBER'] }
        // } else if (!numRegExWithCode.test(mobileNo)) {
        //     return { status: false, error: appConstants['PLEASE_ENTER_VALID_PHONE_NUMBER'] }
    } else {
        return { status: true, error: '' }
    }
}

export const validateMobileNoWithoutPlusSymbol = mobileNo => {
    // const numRegExWithCode = /^\+(?:[0-9] ?){10,12}[0-9]$/
    const numRegExWithCode = /^[1-9][0-9]{9,12}$/;
    mobileNo = mobileNo.trim()
    if (mobileNo == "" || mobileNo == undefined || mobileNo == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_PHONE_NUMBER'] }
    } else if (!numRegExWithCode.test(mobileNo)) {
        return { status: false, error: appConstants['PLEASE_ENTER_VALID_PHONE_NUMBER'] }
    } else {
        return { status: true, error: '' }
    }
}

export const validatePrice = number => {
    const numberRegEx = /^[0-9][0-9]*$/
    number = number.trim()
    if (number == "" || number == undefined || number == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_FEES'] }
    } else if (!numberRegEx.test(number)) {
        return { status: false, error: appConstants['PLEASE_ENTER_VALID_AMOUNT'] }
    } else {
        return { status: true, error: '' }
    }
}