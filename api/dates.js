const moment = require('moment-timezone')

const din = (today, dayINeed = 4) => {
  // if we haven't yet passed the day of the week that I need:
  if (moment(today).isoWeekday() <= dayINeed) {
    // then just give me this week's instance of that day
    return moment(today).isoWeekday(dayINeed)
  } else {
    // otherwise, give me next week's instance of that day
    return moment(today).add(1, 'weeks').isoWeekday(dayINeed)
  }
}

const getNextElFromArr = (arr, el) => {
  arr = arr.sort()
  if (arr.indexOf(el) + 1 === arr.length) {
    return arr[0]
  } else {
    return arr[arr.indexOf(el) + 1]
  }
}

const strToMin = str => {
  const [hours, minutes] = str.split(':')
  return (hours * 60) + minutes
}

const insertTimeToArray = (element, array) => {
  let a = [...array]
  if (~element.indexOf(':')) {
    a.push(element)
    a.sort((a, b) => strToMin(a) - strToMin(b))
  }
  return a
}

const getReqDayOfWeek = (args = {}) => {
  const {day = new Date().toISOString(), days = [], hours = [], timezone = 'Europe/London'} = args

  if (!days.length || !hours.length) {
    return null
  }

  const today = moment(day).tz(timezone)
  const lastTime = `${today.hours()}:${('0' + today.minutes()).slice(-2)}`
  // temporary array to determine next time
  const temp = [...new Set(insertTimeToArray(lastTime, hours))] // const temp = Array.from(new Set(insertTimeToArray(lastTime, hours)))
  // check if the time is in thhe array
  const found = temp.indexOf(lastTime)
  const index = temp[found + 1] ? found + 1 : 0
  // gettng hour, minute
  const [hour, minute] = (index ? temp[index] : temp[0]).split(':')

  if (found + 1 === temp.length) {
    const nextWeekDay = getNextElFromArr(days, moment(day).tz(timezone).isoWeekday())
    return din(today, nextWeekDay).tz(timezone).hour(hour).minute(minute).subtract(0, 'minutes').toISOString()
  } else {
    return moment().tz(timezone).hour(hour).minute(minute).subtract(2, 'minutes').toISOString()
  }
}

const getNextDeliveryTime = (args = {}) => {
  return getReqDayOfWeek(args)
}

module.exports = {
  getNextDeliveryTime
}
