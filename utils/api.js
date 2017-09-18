import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://thepressreview.com/api' : 'http://localhost:3000/api',
  timeout: 20000,
  headers: {'X-Custom-Header': 'foobar'}
})

export const ReadersApi = {
  getLocation: async () => {
    const geo = axios.create({
      baseURL: 'https://freegeoip.net/json/'
    })
    const res = await geo.get()
    return await res.data
  },
  testTax: async (item = {}, token) => {
    const res = await api.put(`/testTax?token=${token}`, item)
    return await res.data
  },
  removeCard: async (item = {}, token) => {
    const res = await api.put(`/readers/billing/removeCard?token=${token}`, item)
    return await res.data
  },
  upgrade: async (item = {}, token) => {
    const res = await api.put(`/readers/billing/upgrade?token=${token}`, item)
    return await res.data
  },
  updateCard: async (item = {}, token) => {
    const res = await api.put(`/readers/billing/card?token=${token}`, item)
    return await res.data
  },
  addHour: async (item = {}, token) => {
    const res = await api.put(`/readers/addSchedule?token=${token}`, item)
    return await res.data
  },
  removeHour: async (item = {}, token) => {
    const res = await api.put(`/readers/removeSchedule?token=${token}`, item)
    return await res.data
  },
  resendLoginLink: async (item = {}) => {
    const res = await api.put(`/readers/resendLoginLink`, item)
    return await res.data
  },
  resendActivationLink: async (item = {}, token) => {
    const res = await api.put(`/readers/resendActivationLink?token=${token}`, item)
    return await res.data
  },
  sendInvitations: async (item = {}, token) => {
    const res = await api.put(`/readers/sendInvitations?token=${token}`, item)
    return await res.data
  },
  markAsReady: async (item = {}, token) => {
    const res = await api.put(`/readers/markAsReady?token=${token}`, item)
    return await res.data
  },
  update: async (item = {}, token) => {
    const res = await api.put(`/readers?token=${token}`, item)
    return await res.data
  },
  createOne: async (item = {}) => {
    const res = await api.post('/readers', item)
    return await res.data
  },
  getSession: async (id, token) => {
    const res = await api.get(`/readers/${id}?token=${token}`)
    return await res.data
  }
}

export const ChannelsApi = {
  findAll: async () => {
    const res = await api.get('/channels')
    return await res.data
  }
}

export const TopicsApi = {
  findAll: async () => {
    const res = await api.get('/topics')
    return await res.data
  }
}

export default {
  api,
  ChannelsApi,
  TopicsApi,
  ReadersApi
}
