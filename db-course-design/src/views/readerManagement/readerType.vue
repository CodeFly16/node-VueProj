<template>
  <a-card>
    <a-button type="primary" @click="showModal">
      添加读者类别
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
        <a-form-item label="读者类别">
          <a-input placeholder="请输入读者类别"
                   v-model="model.rdType">
          </a-input>
        </a-form-item>
        <a-form-item label="可借书数量(本)">
          <a-input-number placeholder="请输入可借书数量" v-model="model.canLendQty" style="width:100%">
          </a-input-number>
        </a-form-item>
        <a-form-item label="可借书时间(天)">
          <a-input-number placeholder="请输入可借书时间" v-model="model.canLendDay" style="width:100%">
          </a-input-number>
        </a-form-item>
        <a-form-item label="可续借次数">
          <a-input-number placeholder="请输入可续借次数" v-model="model.relendNum" style="width:100%">
          </a-input-number>
        </a-form-item>
        <a-form-item label="借书证有效期时间(年)">
          <a-input-number placeholder="请输入借书证有效期时间" v-model="model.cardValidYear" style="width:100%">
          </a-input-number>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>


</template>

<script>
export default {
  name: "readerType",
  data() {
    return {
      model: {},
      labelCol: {span: 7},
      wrapperCol: {span: 14},
      dataSource: [],
      columns: [
        {
          title: '读者类别',
          dataIndex: 'rdType',
        },
        {
          title: '可借书数量(本)',
          dataIndex: 'canLendQty',
        },
        {
          title: '可借书时间(天)',
          dataIndex: 'canLendDay',
        },
        {
          title: '可续借次数',
          dataIndex: 'relendNum',
        },
        {
          title: '借书证有效期时间(年)',
          dataIndex: 'cardValidYear',
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
      const data = await this.$http[0].delete(`/rest/readerType/${key}`)
      if (data.status === 200) {
        this.loadData()
        this.$message.success('删除成功')
      }
    },
    async loadData() {
      this.dataSource = []
      let data = await this.$http[0].get('/rest/readerType')
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
        const data = await this.$http[0].post('/rest/readerType', this.model)
        if (data.status === 200) {
          this.loadData()
          this.$message.success('添加成功')
        }
      } else {
        const data = await this.$http[0].put(`/rest/readerType/${this.model._id}`, this.model)
        if (data.status === 200) {
          this.loadData()
          this.$message.success('编辑成功')
        }
      }
      this.visible = false;
    },
    async edit(key) {
      this.isEdit = true
      const {data} = await this.$http[0].get(`/rest/readerType/${key}`)
      console.log(data)
      this.model = data
      console.log(this.model)
      this.visible = true
    },
  }
}
</script>

<style scoped>

</style>