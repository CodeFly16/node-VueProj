<template>
  <a-card>
    <a-button type="primary" @click="showModal">
      添加图书
    </a-button>
    <a-spin tip="Loading..." :spinning="spinning">
      <a-table bordered :data-source="dataSource" :columns="columns" style="margin-top:10px">
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
              v-if="dataSource.length"
              title="确认删除吗"
              @confirm="() => onDelete(record.bkID)">
            <a-button type="danger" style="margin-left: 10px">
              删除
            </a-button>
          </a-popconfirm>
          <a-button style="margin-left: 10px" @click="edit(record.bkID)">编辑</a-button>
        </template>
      </a-table>
    </a-spin>

    <a-modal v-model="visible" title="添加读者类别" @ok="handleOk" ok-text="确认" cancel-text="取消">
      <a-form :label-col=labelCol :wrapper-col="wrapperCol">
        <a-form-item label="名称">
          <a-input placeholder="请输入图书名称"
                   v-model="model.bkName">
          </a-input>
        </a-form-item>
        <a-form-item label="作者">
          <a-input placeholder="请输入图书作者" v-model="model.bkAuthor">
          </a-input>
        </a-form-item>
        <a-form-item label="出版社">
          <a-input placeholder="请输入图书出版社" v-model="model.bkPress">
          </a-input>
        </a-form-item>
        <a-form-item label="价格">
          <a-input placeholder="请输入图书价格" v-model="model.bkPrice">
          </a-input>
        </a-form-item>
        <a-form-item label="状态">
          <a-input placeholder="请输入图书状态" v-model="model.bkStatus">
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>


</template>

<script>
export default {
  name: "LibraryManagement",
  data() {
    return {
      model: {},
      labelCol: {span: 7},
      wrapperCol: {span: 14},
      dataSource: [],
      columns: [
        {
          title: '名称',
          dataIndex: 'bkName',
          width: '30%',
        },
        {
          title: '作者',
          dataIndex: 'bkAuthor',
        },
        {
          title: '出版社',
          dataIndex: 'bkPress',
        },
        {
          title: '价格',
          dataIndex: 'bkPrice',
        },
        {
          title: '状态',
          dataIndex: 'bkStatus',
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
      console.log(key)
      const {data} = await this.$http[1].delete(`/rest/testSix/libraryManagement/${key}`)
      if (data.msg === 'success') {
        this.loadData()
        this.$message.success('删除成功')
      }
    },
    async loadData() {
      this.dataSource = []
      let {data} = await this.$http[1].get('/rest/testSix/libraryManagement')
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
        const {data} = await this.$http[1].post('/rest/testSix/libraryManagement', this.model)
        if (data.msg === "success") {
          this.loadData()
          this.$message.success('添加成功')
        }
      } else {
        const {data} = await this.$http[1].put(`/rest/testSix/libraryManagement/${this.model.bkID}`, this.model)
        if (data.msg === "success") {
          this.loadData()
          this.$message.success('编辑成功')
        }
      }
      this.visible = false;
    },
    async edit(key) {
      this.isEdit = true
      console.log(key)
      const {data} = await this.$http[1].get(`/rest/testSix/libraryManagement/${key}`)
      console.log(data)
      this.model = data.data[0]
      console.log(this.model)
      this.visible = true
    },
  }
}
</script>

<style scoped>

</style>