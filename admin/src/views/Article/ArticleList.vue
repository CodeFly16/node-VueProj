<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑
          </el-button>
          <el-button type="warning" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "ArticleList",
    data() {
      return {
        items: []
      }
    },
    created() {
      this.fetch()
    },
    methods: {
      async fetch() {
        const res = await this.$http.get('rest/article')
        this.items = res.data
        console.log(this.items)
        console.log(res)
      },
      handleDelete(row) {
        this.$confirm(`是否确定要删除文章"${row.title}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`rest/article/${row._id}`)
          if (res) {
            this.fetch()
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      },
    }
  }
</script>

<style scoped>

</style>