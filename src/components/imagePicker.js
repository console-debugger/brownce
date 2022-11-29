import ImagePicker from 'react-native-image-crop-picker';
import { Platform, PixelRatio } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './helper';
import { THEME } from '../utils/colors';

export const imagePicker = async () => {
    return new Promise((resolve, reject) => ImagePicker.openPicker({
        cropping: true,
        width: SCREEN_WIDTH * PixelRatio.get(),
        height: SCREEN_HEIGHT * 0.7 * PixelRatio.get(),
        cropperStatusBarColor: THEME,
        cropperToolbarColor: THEME,
        smartAlbums: Platform.OS === 'ios' && ['UserLibrary', 'PhotoStream', 'Bursts', 'Screenshots'],
        mediaType: 'photo'
    }).then(image => {
        const fileName = image.path.split('/').filter(item => {
            if (item.includes('.jpeg') || item.includes('.jpg') || item.includes('.png'))
                return item
        })
        resolve({ uri: image.path, type: image.mime, name: fileName.toString() })
    }).catch(err => {
        reject(err)
    })
    )
}
export const multipleimagePicker = async () => {
    return new Promise((resolve, reject) => ImagePicker.openPicker({
        cropping: true,
        width: SCREEN_WIDTH * PixelRatio.get(),
        height: SCREEN_HEIGHT * 0.7 * PixelRatio.get(),
        cropperStatusBarColor: THEME,
        cropperToolbarColor: THEME,
        multiple: true,
        smartAlbums: Platform.OS === 'ios' && ['UserLibrary', 'PhotoStream', 'Bursts', 'Screenshots'],

    }).then(image => {
        const formatedData = image.map((item) => {
            const fileName = item.path.split('/').filter(each => {
                if (each.includes('.jpeg') || each.includes('.jpg') || each.includes('.png'))
                    return each
            })
            const data = {
                uri: item.path,
                type: item.mime,
                name: fileName.toString()
            }
            return data
        })
        resolve(formatedData)

    }).catch(err => {
        reject(err)
    })
    )
}

export const openCamera = async () => {
    return new Promise((resolve, reject) => ImagePicker.openCamera({
        cropping: true,
        width: SCREEN_WIDTH * PixelRatio.get(),
        height: SCREEN_HEIGHT * 0.7 * PixelRatio.get(),
        cropperStatusBarColor: THEME,
        cropperToolbarColor: THEME,
        smartAlbums: Platform.OS === 'ios' && ['UserLibrary', 'PhotoStream', 'Bursts', 'Screenshots'],
        mediaType: 'photo'
    }).then(image => {
        const fileName = image.path.split('/').filter(item => {
            if (item.includes('.jpeg') || item.includes('.jpg') || item.includes('.png'))
                return item
        })
        resolve({ uri: image.path, type: image.mime, name: fileName.toString() })
    }).catch(err => {
        reject(err)
    })
    )
}