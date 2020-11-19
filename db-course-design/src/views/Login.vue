<template>
  <a-card title="请登录" class="login-card">
    <a-form @submit.native.prevent="login">
      <a-form-item>
        <a-input placeholder="Username" v-model="model.username">
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input type="password" placeholder="Password" v-model="model.password">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async login() {
      const res = await axios.post('http://localhost:3000/admin/api/login', this.model)
      console.log(res)
      localStorage.token = res.data.token
      this.$router.push('/main')
      this.$message.success("登陆成功")
    }
  },
  components: {}
}
</script>

<style scoped>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>
