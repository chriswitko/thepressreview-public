import Router from 'next/router'

export const classNames = (classes) => {
  return Object.entries(classes)
    .filter(([key, value]) => value)
    .map(([key, value]) => key)
    .join(' ')
}

export const idx = (props, obj) => {
  const keys = typeof props === 'string' ? props.split('.') : props
  return keys.reduce((a, b) => (a && a[b]) ? a[b] : null, obj)
}

export const px = n => typeof n === 'number' ? n + 'px' : n

export const color = props => (n = 'blue') => idx([ 'colors', n ], props.theme) || n

export const darken = n => `rgba(0, 0, 0, ${n})`

export const caps = props => props.caps ? ({
  textTransform: 'uppercase',
  letterSpacing: '.2em'
}) : {}

export const align = props => {
  if (props.left) return 'left'
  if (props.center) return 'center'
  if (props.right) return 'right'
  if (props.justify) return 'justify'
  return null
}

export const redirect = (ctx, path, reload = false) => {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: path })
    ctx.res.end()
  } else {
    if (reload) {
      document.location.href = path
    } else {
      Router.push(path)
    }
  }
}

export const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start)

export const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

export const lead = h => ('00' + h).slice(-2)

export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ')

  let [hours, minutes] = time.split(':')

  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'pm') {
    hours = parseInt(hours, 10) + 12
  }

  return hours + ':' + minutes
}

export const delay = (interval) => {
  return new Promise((resolve) => {
    setTimeout(resolve, interval)
  })
}

export const convertTime = (hour, type = '24') => {
  const [ h, m ] = hour.split(':')
  return type === '24' ? hour : parseInt(h) === 12 ? (lead(h) + ':' + m + ' pm') : (parseInt(h) > 12) ? (lead(h - 12) + ':' + m + ' pm') : (lead(h) + ':' + m + ' am')
}

export default {
  convertTime,
  delay,
  convertTime12to24,
  range,
  flatten,
  lead,
  classNames,
  idx,
  px,
  color,
  darken,
  caps,
  align,
  redirect
}
