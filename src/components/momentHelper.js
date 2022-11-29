import moment from 'moment'

export const dobFormat = date => moment(date).format('MM/DD/YYYY')

export const timeFormat = time => moment(time).format('hh:mm A' )
