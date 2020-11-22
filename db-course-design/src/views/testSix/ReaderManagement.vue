<template>
  <a-card>
    <a-button type="primary" @click="showModal">
      添加读者
    </a-button>
    <a-spin tip="Loading..." :spinning="spinning">
      <a-table bordered :data-source="dataSource" :columns="columns" style="margin-top:10px">
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
              v-if="dataSource.length"
              title="确认删除吗"
              @confirm="() => onDelete(record.rdID)">
            <a-button type="danger" style="margin-left: 10px">
              删除
            </a-button>
          </a-popconfirm>
          <a-button style="margin-left: 10px" @click="edit(record.rdID)">编辑</a-button>
        </template>
      </a-table>
    </a-spin>

    <a-modal v-model="visible" title="添加读者类别" @ok="handleOk" ok-text="确认" cancel-text="取消">
      <a-form :label-col=labelCol :wrapper-col="wrapperCol">
        <a-form-item label="类型">
          <a-select style="width: 100%" v-model="model.rdType" placeholder="请选择读者类型">
            <a-select-option :value="item.rdType" v-for="item in selectData" :key="item.rdType">
              {{ item.rdTypeName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="姓名">
          <a-input placeholder="请输入读者姓名" v-model="model.rdName">
          </a-input>
        </a-form-item>
        <a-form-item label="部门">
          <a-input placeholder="请输入读者部门" v-model="model.rdDept">
          </a-input>
        </a-form-item>
        <a-form-item label="QQ">
          <a-input placeholder="请输入读者QQ" v-model="model.rdQQ">
          </a-input>
        </a-form-item>
        <a-form-item label="已借书数量">
          <a-input placeholder="请输入读者已借书数量" v-model="model.rdBorrowQty">
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
          title: '类型',
          dataIndex: 'rdTypeName',
        },
        {
          title: '姓名',
          dataIndex: 'rdName',
        },
        {
          title: '部门',
          dataIndex: 'rdDept',
        },
        {
          title: 'QQ',
          dataIndex: 'rdQQ',
        },
        {
          title: '已借书数量',
          dataIndex: 'rdBorrowQty',
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
      selectData: []
    }
  },
  created() {
    this.loadData()
    this.loadDictData()
  },
  methods: {

    async loadData() {
      this.dataSource = []
      let {data} = await this.$http[1].get('/rest/testSix/readerManagement')
      this.dataSource = [...data.data]
      this.spinning = false
      console.log(this.dataSource)
    },
    async loadDictData() {
      let {data} = await this.$http[1].get('/rest/testSix/readerCategory')
      console.log(data)
      data.data.forEach(item => {
        this.selectData.push({
          rdType: item.rdType,
          rdTypeName: item.rdTypeName
        })
      })
    },
    showModal() {
      this.isEdit = false
      this.model = {}
      this.visible = true
    },
    async onDelete(key) {
      console.log(key)
      const {data} = await this.$http[1].delete(`/rest/testSix/readerManagement/${key}`)
      if (data.msg === 'success') {
        this.loadData()
        this.$message.success('删除成功')
      }
    },
    async handleOk(e) {
      console.log(this.model)
      if (!this.isEdit) {
        const {data} = await this.$http[1].post('/rest/testSix/readerManagement', this.model)
        if (data.msg === "success") {
          this.loadData()
          this.$message.success('添加成功')
        }
      } else {
        const {data} = await this.$http[1].put(`/rest/testSix/readerManagement`, this.model)
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
      const {data} = await this.$http[1].get(`/rest/testSix/readerManagement/${key}`)
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