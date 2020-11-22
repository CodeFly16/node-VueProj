import axios from "axios"
import Vue from 'vue'
import router from "../router/index";

const http = [
  axios.create({
    baseURL: process.env.VUE_APP_APIA_URL || '/admin/api',
    // baseURL: "http://localhost:3000/mysqlTest/api"
  }),
  axios.create({
    baseURL: process.env.VUE_APP_APIB_URL || '/mysqlTest/api',
    // baseURL: "http://localhost:3000/mysqlTest/api"
  }),
]

http.forEach(item => {
  item.interceptors.request.use(config => {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token")
    }
    return config
  }, err => {
    return Promise.reject(err)
  })
})

http.forEach(item => {
  item.interceptors.response.use(res => {
    return res
  }, err => {
    if (err.response.data.message) {
      Vue.prototype.$message.error(err.response.data.message)
    }
    if (err.response.status === 401) {
      router.push('/login')
    }
    console.log(err.response.data.message)
    return Promise.reject(err)
  })
})



export default http