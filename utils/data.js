import { flatten, range, lead } from './'

export const timezones = {
  '(GMT+00:00) Casablanca': 'Africa/Casablanca',
  '(GMT+00:00) Dublin': 'Europe/Dublin',
  '(GMT+00:00) Lisbon': 'Europe/Lisbon',
  '(GMT+00:00) London': 'Europe/London',
  '(GMT+00:00) Monrovia': 'Africa/Monrovia',
  '(GMT+01:00) Algiers': 'Africa/Algiers',
  '(GMT+01:00) Amsterdam': 'Europe/Amsterdam',
  '(GMT+01:00) Berlin': 'Europe/Berlin',
  '(GMT+01:00) Brussels': 'Europe/Brussels',
  '(GMT+01:00) Budapest': 'Europe/Budapest',
  '(GMT+01:00) Central European Time - Belgrade': 'Europe/Belgrade',
  '(GMT+01:00) Central European Time - Prague': 'Europe/Prague',
  '(GMT+01:00) Copenhagen': 'Europe/Copenhagen',
  '(GMT+01:00) Madrid': 'Europe/Madrid',
  '(GMT+01:00) Paris': 'Europe/Paris',
  '(GMT+01:00) Rome': 'Europe/Rome',
  '(GMT+01:00) Stockholm': 'Europe/Stockholm',
  '(GMT+01:00) Vienna': 'Europe/Vienna',
  '(GMT+01:00) Warsaw': 'Europe/Warsaw',
  '(GMT+02:00) Athens': 'Europe/Athens',
  '(GMT+02:00) Bucharest': 'Europe/Bucharest',
  '(GMT+02:00) Cairo': 'Africa/Cairo',
  '(GMT+02:00) Helsinki': 'Europe/Helsinki',
  '(GMT+02:00) Jerusalem': 'Asia/Jerusalem',
  '(GMT+02:00) Johannesburg': 'Africa/Johannesburg',
  '(GMT+02:00) Kiev': 'Europe/Kiev',
  '(GMT+02:00) Moscow-01 - Kaliningrad': 'Europe/Kaliningrad',
  '(GMT+02:00) Riga': 'Europe/Riga',
  '(GMT+02:00) Sofia': 'Europe/Sofia',
  '(GMT+02:00) Tallinn': 'Europe/Tallinn',
  '(GMT+02:00) Vilnius': 'Europe/Vilnius',
  '(GMT+03:00) Baghdad': 'Asia/Baghdad',
  '(GMT+03:00) Istanbul': 'Europe/Istanbul',
  '(GMT+03:00) Minsk': 'Europe/Minsk',
  '(GMT+03:00) Moscow+00 - Moscow': 'Europe/Moscow',
  '(GMT+03:00) Nairobi': 'Africa/Nairobi',
  '(GMT+03:00) Riyadh': 'Asia/Riyadh',
  '(GMT+03:30) Tehran': 'Asia/Tehran',
  '(GMT+04:00) Baku': 'Asia/Baku',
  '(GMT+04:00) Moscow+01 - Samara': 'Europe/Samara',
  '(GMT+04:00) Tbilisi': 'Asia/Tbilisi',
  '(GMT+04:00) Yerevan': 'Asia/Yerevan',
  '(GMT+04:30) Kabul': 'Asia/Kabul',
  '(GMT+05:00) Karachi': 'Asia/Karachi',
  '(GMT+05:00) Moscow+02 - Yekaterinburg': 'Asia/Yekaterinburg',
  '(GMT+05:00) Tashkent': 'Asia/Tashkent',
  '(GMT+05:30) Colombo': 'Asia/Colombo',
  '(GMT+06:00) Almaty': 'Asia/Almaty',
  '(GMT+06:00) Dhaka': 'Asia/Dhaka',
  '(GMT+06:30) Rangoon': 'Asia/Rangoon',
  '(GMT+07:00) Bangkok': 'Asia/Bangkok',
  '(GMT+07:00) Jakarta': 'Asia/Jakarta',
  '(GMT+07:00) Moscow+04 - Krasnoyarsk': 'Asia/Krasnoyarsk',
  '(GMT+08:00) China Time - Beijing': 'Asia/Shanghai',
  '(GMT+08:00) Hong Kong': 'Asia/Hong_Kong',
  '(GMT+08:00) Kuala Lumpur': 'Asia/Kuala_Lumpur',
  '(GMT+08:00) Moscow+05 - Irkutsk': 'Asia/Irkutsk',
  '(GMT+08:00) Singapore': 'Asia/Singapore',
  '(GMT+08:00) Taipei': 'Asia/Taipei',
  '(GMT+08:00) Ulaanbaatar': 'Asia/Ulaanbaatar',
  '(GMT+08:00) Western Time - Perth': 'Australia/Perth',
  '(GMT+09:00) Moscow+06 - Yakutsk': 'Asia/Yakutsk',
  '(GMT+09:00) Seoul': 'Asia/Seoul',
  '(GMT+09:00) Tokyo': 'Asia/Tokyo',
  '(GMT+09:30) Central Time - Darwin': 'Australia/Darwin',
  '(GMT+10:00) Eastern Time - Brisbane': 'Australia/Brisbane',
  '(GMT+10:00) Guam': 'Pacific/Guam',
  '(GMT+10:00) Moscow+07 - Magadan': 'Asia/Magadan',
  '(GMT+10:00) Moscow+07 - Yuzhno-Sakhalinsk': 'Asia/Vladivostok',
  '(GMT+10:00) Port Moresby': 'Pacific/Port_Moresby',
  '(GMT+10:30) Central Time - Adelaide': 'Australia/Adelaide',
  '(GMT+11:00) Eastern Time - Hobart': 'Australia/Hobart',
  '(GMT+11:00) Eastern Time - Melbourne, Sydney': 'Australia/Sydney',
  '(GMT+11:00) Guadalcanal': 'Pacific/Guadalcanal',
  '(GMT+11:00) Noumea': 'Pacific/Noumea',
  '(GMT+12:00) Majuro': 'Pacific/Majuro',
  '(GMT+12:00) Moscow+09 - Petropavlovsk-Kamchatskiy': 'Asia/Kamchatka',
  '(GMT+13:00) Auckland': 'Pacific/Auckland',
  '(GMT+13:00) Fakaofo': 'Pacific/Fakaofo',
  '(GMT+13:00) Fiji': 'Pacific/Fiji',
  '(GMT+13:00) Tongatapu': 'Pacific/Tongatapu',
  '(GMT+14:00) Apia': 'Pacific/Apia',
  '(GMT-01:00) Azores': 'Atlantic/Azores',
  '(GMT-01:00) Cape Verde': 'Atlantic/Cape_Verde',
  '(GMT-02:00) Sao Paulo': 'America/Sao_Paulo',
  '(GMT-02:00) South Georgia': 'Atlantic/South_Georgia',
  '(GMT-03:00) Buenos Aires': 'America/Argentina/Buenos_Aires',
  '(GMT-03:00) Godthab': 'America/Godthab',
  '(GMT-03:00) Montevideo': 'America/Montevideo',
  '(GMT-03:00) Santiago': 'America/Santiago',
  '(GMT-03:30) Newfoundland Time - St. Johns': 'America/St_Johns',
  '(GMT-04:00) Atlantic Time - Halifax': 'America/Halifax',
  '(GMT-04:00) Guyana': 'America/Guyana',
  '(GMT-04:00) La Paz': 'America/La_Paz',
  '(GMT-04:30) Caracas': 'America/Caracas',
  '(GMT-05:00) Bogota': 'America/Bogota',
  '(GMT-05:00) Eastern Time': 'America/New_York',
  '(GMT-05:00) Lima': 'America/Lima',
  '(GMT-06:00) Central Time': 'America/Chicago',
  '(GMT-06:00) Central Time - Mexico City': 'America/Mexico_City',
  '(GMT-06:00) Central Time - Regina': 'America/Regina',
  '(GMT-06:00) Guatemala': 'America/Guatemala',
  '(GMT-07:00) Mountain Time': 'America/Denver',
  '(GMT-07:00) Mountain Time - Arizona': 'America/Phoenix',
  '(GMT-07:00) Mountain Time - Chihuahua, Mazatlan': 'America/Mazatlan',
  '(GMT-08:00) Pacific Time': 'America/Los_Angeles',
  '(GMT-08:00) Pacific Time - Tijuana': 'America/Tijuana',
  '(GMT-10:00) Hawaii Time': 'Pacific/Honolulu',
  '(GMT-11:00) Pago Pago': 'Pacific/Pago_Pago'
}

export const languages = [
  {name: 'English', i18n: 'language_english', nativeName: 'English', code: 'en'},
  {name: 'French', i18n: 'language_french', nativeName: 'Français', code: 'fr'},
  {name: 'German', i18n: 'language_german', nativeName: 'Deutsche', code: 'de'},
  {name: 'Spanish', i18n: 'language_spanish', nativeName: 'Español', code: 'es'},
  {name: 'Polish', i18n: 'language_polish', nativeName: 'Polski', code: 'pl'}
]

export const groupBy = [
  {name: 'Topics', value: 'topics', i18n: 'groupby_topics'},
  {name: 'Channels', value: 'channels', i18n: 'groupby_channels'}
]

export const timeformat = [
  {
    key: '24',
    value: '24-Hour Time',
    i18n: 'timeformat_24'
  },
  {
    key: '12',
    value: '12-Hour Time',
    i18n: 'timeformat_12'
  }
]

const minutes = [0, 15, 30, 45]
const times24 = flatten(range(0, 24).map(h => minutes.map(m => `${lead(h)}:${lead(m)}`)))
// const times12 = [...flatten(range(0, 12).map(h => minutes.map(m => `${lead(h)}:${lead(m)}`))).filter(h => !exclude.includes(h)).map(h => `${h} am`), '12:00 pm', ...flatten(range(1, 12).map(h => minutes.map(m => `${lead(h)}:${lead(m)}`))).filter(h => !exclude.includes(h)).map(h => `${h} pm`)]

export const hours = n => n === '24' ? times24 : times24

export const days = [
  {key: 1, name: 'Monday', short: 'Mo', i18n: 'day_monday', i18_short: 'day_mo'},
  {key: 2, name: 'Tuesday', short: 'Tu', i18n: 'day_tuesday', i18_short: 'day_tu'},
  {key: 3, name: 'Wednesday', short: 'We', i18n: 'day_wednesday', i18_short: 'day_we'},
  {key: 4, name: 'Thursday', short: 'Th', i18n: 'day_thursday', i18_short: 'day_th'},
  {key: 5, name: 'Friday', short: 'Fr', i18n: 'day_friday', i18_short: 'day_fr'},
  {key: 6, name: 'Saturday', short: 'Sa', i18n: 'day_saturday', i18_short: 'day_sa'},
  {key: 7, name: 'Sunday', short: 'Su', i18n: 'day_sunday', i18_short: 'day_su'}
]

export const colors = [
  {
    bg: '#000000',
    txt: '',
    link: '',
    isActive: true
  },
  {
    bg: '#ffffff',
    txt: '',
    link: ''
  },
  {
    bg: '#3CB371',
    txt: '',
    link: ''
  },
  {
    bg: '#F5EFE6',
    txt: '',
    link: ''
  },
  {
    bg: '#4267B2',
    txt: '',
    link: ''
  },
  {
    bg: '#CAEEFB',
    txt: '',
    link: ''
  },
  {
    bg: '#50495A',
    txt: '',
    link: ''
  },
  {
    bg: '#D5D5D5',
    txt: '',
    link: ''
  },
  {
    bg: '#E95131',
    txt: '',
    link: ''
  },
  {
    bg: '#FAF785',
    txt: '',
    link: ''
  }
]

export const countries = {'BD': 'Bangladesh', 'BE': 'Belgium', 'BF': 'Burkina Faso', 'BG': 'Bulgaria', 'BA': 'Bosnia and Herzegovina', 'BB': 'Barbados', 'WF': 'Wallis and Futuna', 'BL': 'Saint Barthelemy', 'BM': 'Bermuda', 'BN': 'Brunei', 'BO': 'Bolivia', 'BH': 'Bahrain', 'BI': 'Burundi', 'BJ': 'Benin', 'BT': 'Bhutan', 'JM': 'Jamaica', 'BV': 'Bouvet Island', 'BW': 'Botswana', 'WS': 'Samoa', 'BQ': 'Bonaire, Saint Eustatius and Saba ', 'BR': 'Brazil', 'BS': 'Bahamas', 'JE': 'Jersey', 'BY': 'Belarus', 'BZ': 'Belize', 'RU': 'Russia', 'RW': 'Rwanda', 'RS': 'Serbia', 'TL': 'East Timor', 'RE': 'Reunion', 'TM': 'Turkmenistan', 'TJ': 'Tajikistan', 'RO': 'Romania', 'TK': 'Tokelau', 'GW': 'Guinea-Bissau', 'GU': 'Guam', 'GT': 'Guatemala', 'GS': 'South Georgia and the South Sandwich Islands', 'GR': 'Greece', 'GQ': 'Equatorial Guinea', 'GP': 'Guadeloupe', 'JP': 'Japan', 'GY': 'Guyana', 'GG': 'Guernsey', 'GF': 'French Guiana', 'GE': 'Georgia', 'GD': 'Grenada', 'GB': 'United Kingdom', 'GA': 'Gabon', 'SV': 'El Salvador', 'GN': 'Guinea', 'GM': 'Gambia', 'GL': 'Greenland', 'GI': 'Gibraltar', 'GH': 'Ghana', 'OM': 'Oman', 'TN': 'Tunisia', 'JO': 'Jordan', 'HR': 'Croatia', 'HT': 'Haiti', 'HU': 'Hungary', 'HK': 'Hong Kong', 'HN': 'Honduras', 'HM': 'Heard Island and McDonald Islands', 'VE': 'Venezuela', 'PR': 'Puerto Rico', 'PS': 'Palestinian Territory', 'PW': 'Palau', 'PT': 'Portugal', 'SJ': 'Svalbard and Jan Mayen', 'PY': 'Paraguay', 'IQ': 'Iraq', 'PA': 'Panama', 'PF': 'French Polynesia', 'PG': 'Papua New Guinea', 'PE': 'Peru', 'PK': 'Pakistan', 'PH': 'Philippines', 'PN': 'Pitcairn', 'PL': 'Poland', 'PM': 'Saint Pierre and Miquelon', 'ZM': 'Zambia', 'EH': 'Western Sahara', 'EE': 'Estonia', 'EG': 'Egypt', 'ZA': 'South Africa', 'EC': 'Ecuador', 'IT': 'Italy', 'VN': 'Vietnam', 'SB': 'Solomon Islands', 'ET': 'Ethiopia', 'SO': 'Somalia', 'ZW': 'Zimbabwe', 'SA': 'Saudi Arabia', 'ES': 'Spain', 'ER': 'Eritrea', 'ME': 'Montenegro', 'MD': 'Moldova', 'MG': 'Madagascar', 'MF': 'Saint Martin', 'MA': 'Morocco', 'MC': 'Monaco', 'UZ': 'Uzbekistan', 'MM': 'Myanmar', 'ML': 'Mali', 'MO': 'Macao', 'MN': 'Mongolia', 'MH': 'Marshall Islands', 'MK': 'Macedonia', 'MU': 'Mauritius', 'MT': 'Malta', 'MW': 'Malawi', 'MV': 'Maldives', 'MQ': 'Martinique', 'MP': 'Northern Mariana Islands', 'MS': 'Montserrat', 'MR': 'Mauritania', 'IM': 'Isle of Man', 'UG': 'Uganda', 'TZ': 'Tanzania', 'MY': 'Malaysia', 'MX': 'Mexico', 'IL': 'Israel', 'FR': 'France', 'IO': 'British Indian Ocean Territory', 'SH': 'Saint Helena', 'FI': 'Finland', 'FJ': 'Fiji', 'FK': 'Falkland Islands', 'FM': 'Micronesia', 'FO': 'Faroe Islands', 'NI': 'Nicaragua', 'NL': 'Netherlands', 'NO': 'Norway', 'NA': 'Namibia', 'VU': 'Vanuatu', 'NC': 'New Caledonia', 'NE': 'Niger', 'NF': 'Norfolk Island', 'NG': 'Nigeria', 'NZ': 'New Zealand', 'NP': 'Nepal', 'NR': 'Nauru', 'NU': 'Niue', 'CK': 'Cook Islands', 'XK': 'Kosovo', 'CI': 'Ivory Coast', 'CH': 'Switzerland', 'CO': 'Colombia', 'CN': 'China', 'CM': 'Cameroon', 'CL': 'Chile', 'CC': 'Cocos Islands', 'CA': 'Canada', 'CG': 'Republic of the Congo', 'CF': 'Central African Republic', 'CD': 'Democratic Republic of the Congo', 'CZ': 'Czech Republic', 'CY': 'Cyprus', 'CX': 'Christmas Island', 'CR': 'Costa Rica', 'CW': 'Curacao', 'CV': 'Cape Verde', 'CU': 'Cuba', 'SZ': 'Swaziland', 'SY': 'Syria', 'SX': 'Sint Maarten', 'KG': 'Kyrgyzstan', 'KE': 'Kenya', 'SS': 'South Sudan', 'SR': 'Suriname', 'KI': 'Kiribati', 'KH': 'Cambodia', 'KN': 'Saint Kitts and Nevis', 'KM': 'Comoros', 'ST': 'Sao Tome and Principe', 'SK': 'Slovakia', 'KR': 'South Korea', 'SI': 'Slovenia', 'KP': 'North Korea', 'KW': 'Kuwait', 'SN': 'Senegal', 'SM': 'San Marino', 'SL': 'Sierra Leone', 'SC': 'Seychelles', 'KZ': 'Kazakhstan', 'KY': 'Cayman Islands', 'SG': 'Singapore', 'SE': 'Sweden', 'SD': 'Sudan', 'DO': 'Dominican Republic', 'DM': 'Dominica', 'DJ': 'Djibouti', 'DK': 'Denmark', 'VG': 'British Virgin Islands', 'DE': 'Germany', 'YE': 'Yemen', 'DZ': 'Algeria', 'US': 'United States', 'UY': 'Uruguay', 'YT': 'Mayotte', 'UM': 'United States Minor Outlying Islands', 'LB': 'Lebanon', 'LC': 'Saint Lucia', 'LA': 'Laos', 'TV': 'Tuvalu', 'TW': 'Taiwan', 'TT': 'Trinidad and Tobago', 'TR': 'Turkey', 'LK': 'Sri Lanka', 'LI': 'Liechtenstein', 'LV': 'Latvia', 'TO': 'Tonga', 'LT': 'Lithuania', 'LU': 'Luxembourg', 'LR': 'Liberia', 'LS': 'Lesotho', 'TH': 'Thailand', 'TF': 'French Southern Territories', 'TG': 'Togo', 'TD': 'Chad', 'TC': 'Turks and Caicos Islands', 'LY': 'Libya', 'VA': 'Vatican', 'VC': 'Saint Vincent and the Grenadines', 'AE': 'United Arab Emirates', 'AD': 'Andorra', 'AG': 'Antigua and Barbuda', 'AF': 'Afghanistan', 'AI': 'Anguilla', 'VI': 'U.S. Virgin Islands', 'IS': 'Iceland', 'IR': 'Iran', 'AM': 'Armenia', 'AL': 'Albania', 'AO': 'Angola', 'AQ': 'Antarctica', 'AS': 'American Samoa', 'AR': 'Argentina', 'AU': 'Australia', 'AT': 'Austria', 'AW': 'Aruba', 'IN': 'India', 'AX': 'Aland Islands', 'AZ': 'Azerbaijan', 'IE': 'Ireland', 'ID': 'Indonesia', 'UA': 'Ukraine', 'QA': 'Qatar', 'MZ': 'Mozambique'}

export default {
  countries,
  colors,
  days,
  hours,
  groupBy,
  languages,
  timezones,
  timeformat
}
