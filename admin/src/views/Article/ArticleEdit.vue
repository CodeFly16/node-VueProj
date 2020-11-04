<template>
  <div class="about">
    <h1>{{id?'编辑':'新增'}}问章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :value="item._id" :label="item.name" :key="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor id="editor" v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import {VueEditor} from 'vue2-editor'

  export default {
    props: {
      id: {}
    },
    components: {
      VueEditor
    },
    name: "ArticleEdit",
    data() {
      return {
        model: {},
        categories: []
      }
    },
    created() {
      this.fetchCategories()
      this.id && this.fetch()
    },
    methods: {
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        console.log(111)
        let formData = new FormData();
        formData.append("image", file);

        const res = await this.$http.post('upload', formData)
        let url = res.data.url; // Get url from response
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader()
      },

      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`rest/article/${this.id}`, this.model)
        } else {
          res = await this.$http.post("rest/article", this.model)
        }
        this.$router.push("/articles/list")
        this.$message({
          type: 'success',
          message: "保存成功"
        })
        console.log(res)
      },
      async fetch() {
        const res = await this.$http.get(`rest/article/${this.id}`)
        this.model = res.data
      },
      async fetchCategories() {
        const res = await this.$http.get(`rest/categories`)
        this.categories = res.data
        console.log(res)
      }
    }
  }
</script>

<style scoped>

</style>