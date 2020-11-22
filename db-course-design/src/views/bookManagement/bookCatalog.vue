<template>
  <a-card>
    <a-button type="primary" @click="showModal">
      添加图书编目
    </a-button>
    <a-spin tip="Loading..." :spinning="spinning">
      <a-table bordered :data-source="dataSource" :columns="columns" style="margin-top:10px">
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
              v-if="dataSource.length"
              title="确认删除吗"
              @confirm="() => onDelete(record._id)">
            <a-button type="danger" style="margin-left: 10px">
              删除
            </a-button>
          </a-popconfirm>
          <a-button style="margin-left: 10px" @click="edit(record._id)">编辑</a-button>
        </template>
      </a-table>
    </a-spin>

    <a-modal v-model="visible" title="添加读者类别" @ok="handleOk" ok-text="确认" cancel-text="取消">
      <a-form :label-col=labelCol :wrapper-col="wrapperCol">
        <a-form-item label="图书分类号">
          <a-input placeholder="请输入图书分类号"
                   v-model="model.cateNumber">
          </a-input>
        </a-form-item>
        <a-form-item label="图书分类名">
          <a-input placeholder="请输入分类名" v-model="model.cateName">
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>


</template>

<script>
export default {
  name: "bookCatalog",
  data() {
    return {
      model: {},
      labelCol: {span: 7},
      wrapperCol: {span: 14},
      dataSource: [],
      columns: [
        {
          title: '图书分类号',
          dataIndex: 'cateNumber',
        },
        {
          title: '图书分类名',
          dataIndex: 'cateName',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: {customRender: 'operation'},
          width: '200px',
        },
      ],
      spinning: true,
      visible: false,
      isEdit: false,
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async onDelete(key) {
      const data = await this.$http[0].delete(`/rest/bookCatalog/${key}`)
      if (data.status === 200) {
        this.loadData()
        this.$message.success('删除成功')
      }
    },
    async loadData() {
      this.dataSource = []
      let data = await this.$http[0].get('/rest/bookCatalog')
      this.dataSource = [...data.data]
      this.spinning = false
      console.log(this.dataSource)
    },
    showModal() {
      this.isEdit = false
      this.model = {}
      this.visible = true
    },
    async handleOk(e) {
      console.log(this.model)
      if (!this.isEdit) {
        const data = await this.$http[0].post('/rest/bookCatalog', this.model)
        console.log(data)
        if (data.status === 200) {
          this.loadData()
          this.$message.success('添加成功')
        }
      } else {
        const data = await this.$http[0].put(`/rest/bookCatalog/${this.model._id}`, this.model)
        if (data.status === 200) {
          this.loadData()
          this.$message.success('编辑成功')
        }
      }
      this.visible = false;
    },
    async edit(key) {
      this.isEdit = true
      const {data} = await this.$http[0].get(`/rest/bookCatalog/${key}`)
      this.model = data
      this.visible = true
    },
  }
}
</script>

<style scoped>

</style>