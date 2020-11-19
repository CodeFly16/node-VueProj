import axios from "axios"
import Vue from 'vue'
import router from "../router/index";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api'
  // baseURL: "http://localhost:3000/admin/api"
})

http.interceptors.request.use(config => {
  if (localStorage.getItem("token")) {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token")
  }
  return config
}, err => {
  return Promise.reject(err)
})

http.interceptors.response.use(res => {
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


export default http