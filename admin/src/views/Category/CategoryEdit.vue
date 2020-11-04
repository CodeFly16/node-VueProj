<template>
  <div class="about">
    <h1>{{id?'编辑':'新增'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :value="item._id" :label="item.name" :key="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
    name: "CategoryEdit",
    data() {
      return {
        model: {},
        parents: []
      }
    },
    created() {
      this.fetchParents()
      this.id && this.fetch()
    },
    methods: {
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`rest/categories/${this.id}`, this.model)
        } else {
          res = await this.$http.post("rest/categories", this.model)
        }
        this.$router.push("/categories/list")
        this.$message({
          type: 'success',
          message: "保存成功"
        })
        console.log(res)
      },
      async fetch() {
        const res = await this.$http.get(`rest/categories/${this.id}`)
        this.model = res.data
      },
      async fetchParents() {
        const res = await this.$http.get(`rest/categories `)
        this.parents = res.data
        console.log(res)
      }
    }
  }
</script>

<style scoped>

</style>