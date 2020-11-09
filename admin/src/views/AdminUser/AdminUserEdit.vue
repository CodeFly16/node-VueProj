<template>
  <div class="about">
    <h1>{{id?'编辑':'新增'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>


  export default {
    props: {
      id: {}
    },
    name: "AdminUserEdit",
    data() {
      return {
        model: {
          name: '',
          items: []
        },
      }
    },
    created() {
      this.id && this.fetch()
    },
    methods: {
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`rest/adminUser/${this.id}`, this.model)
        } else {
          res = await this.$http.post("rest/adminUser", this.model)
        }
        this.$router.push("/admin_users/list")
        this.$message({
          type: 'success',
          message: "保存成功"
        })
        console.log(res)
      },
      async fetch() {
        const res = await this.$http.get(`rest/adminUser/${this.id}`)
        this.model = Object.assign({}, this.model, res.data)
      },
    }
  }
</script>

<style scoped>

</style>