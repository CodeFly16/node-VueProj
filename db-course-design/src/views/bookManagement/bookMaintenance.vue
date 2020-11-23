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
              @confirm="() => onDelete(record._id)">
            <a-button type="danger" style="margin-left: 10px">
              删除
            </a-button>
          </a-popconfirm>
          <a-button style="margin-left: 10px" @click="edit(record._id)">编辑</a-button>
        </template>
      </a-table>
    </a-spin>

    <a-modal v-model="visible" title="添加图书" @ok="handleOk" ok-text="确认" cancel-text="取消">
      <a-form :label-col=labelCol :wrapper-col="wrapperCol">
        <a-form-item label="图书编号">
          <a-input placeholder="请输入图书编号"
                   v-model="model.bkCode">
          </a-input>
        </a-form-item>
        <a-form-item label="图书书名">
          <a-input placeholder="请输入书名" v-model="model.bkName">
          </a-input>
        </a-form-item>
        <a-form-item label="图书作者">
          <a-input placeholder="请输入作者" v-model="model.bkAuthor">
          </a-input>
        </a-form-item>
        <a-form-item label="图书出版社">
          <a-input placeholder="请输入出版社" v-model="model.bkPress">
          </a-input>
        </a-form-item>
        <a-form-item label="图书出版日期">
          <a-date-picker placeholder="请输入出版日期"
                         style="width: 100%"
                         v-model="model.bkDatePress"
                         @change="setDate">
          </a-date-picker>
        </a-form-item>
        <a-form-item label="图书ISBN书号">
          <a-input placeholder="请输入ISBN书号" v-model="model.bkISBN">
          </a-input>
        </a-form-item>
        <a-form-item label="图书分类">
          <a-select :default-value="model.bkCatalog" style="width:100%"
                    v-model="model.bkCatalog"
                    placeholder="请选择分类">
            <a-select-option :value="item.cateNumber" v-for="item in cateList" :key="item">
              {{ item.cateName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="图书语言">
          <a-select :default-value="model.bkLanguage" style="width:100%"
                    v-model="model.bkLanguage"
                    placeholder="请选择语言">
            <a-select-option :value="item.value" v-for="item in language" :key="item">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="图书页数">
          <a-input placeholder="请输入页数" v-model="model.bkPages">
          </a-input>
        </a-form-item>
        <a-form-item label="图书价格">
          <a-input placeholder="请输入价格" v-model="model.bkPrice">
          </a-input>
        </a-form-item>
        <a-form-item label="图书简介">
          <a-input placeholder="请输入简介" v-model="model.bkBrief">
          </a-input>
        </a-form-item>
        <a-form-item label="上传图书封面照片">
          <a-upload
              name="file"
              list-type="picture-card"
              class="avatar-uploader"
              :headers="{Authorization:'Bearer ' + token}"
              :show-upload-list="false"
              action="http://47.98.225.213/admin/api/upload'"
              @change="uploadPic">
            <img v-if="model.bkCover" :src="model.bkCover" alt="avatar" style="width: 100%"/>
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="图书状态">
          <a-select :default-value="model.bkStatus?model.bkStatus:'在馆'" style="width:100%"
                    v-model="model.bkStatus"
                    placeholder="请选择图书状态">
            <a-select-option :value="item" v-for="item in status" :key="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>


</template>

<script>
export default {
  name: "bookMaintenance",
  data() {
    return {
      model: {},
      labelCol: {span: 7},
      wrapperCol: {span: 14},
      dataSource: [],
      language: [{value: 0, label: '中文'}, {value: 1, label: '英文'}, {value: 2, label: '日文'},
        {value: 3, label: '俄文'}, {value: 4, label: '德文'}, {value: 5, label: '法文'}],
      status: ['在馆', '借出', '遗失', '变卖', '销毁'],
      cateList: [],
      columns: [
        {
          title: '编号',
          dataIndex: 'bkCode',
        },
        {
          title: '书名',
          dataIndex: 'bkName',
        },
        {
          title: '作者',
          dataIndex: 'bkAuthor',
        },
        {
          title: 'ISBN书号',
          dataIndex: 'bkISBN',
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
      token: localStorage.getItem("token"),
      spinning: true,
      visible: false,
      loading: false,
      isEdit: false,
    }
  },
  created() {
    this.loadData()
    this.fetchCata()
  },
  methods: {
    uploadPic(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        console.log(info)
        this.loading = false
        this.$set(this.model, 'bkCover', info.file.response.url)
      }
    },
    async fetchCata() {
      let data = await this.$http[0].get('/rest/bookCatalog')
      this.cateList = data.data
    },
    setDate(date, dateString) {
      this.model.bkDatePress = dateString
    },
    async onDelete(key) {
      const data = await this.$http[0].delete(`/rest/book/${key}`)
      if (data.status === 200) {
        this.loadData()
        this.$message.success('删除成功')
      }
    },
    async loadData() {
      this.dataSource = []
      let data = await this.$http[0].get('/rest/book')
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
        const data = await this.$http[0].post('/rest/book', this.model)
        console.log(data)
        if (data.status === 200) {
          this.loadData()
          this.$message.success('添加成功')
        }
      } else {
        const data = await this.$http[0].put(`/rest/book/${this.model._id}`, this.model)
        if (data.status === 200) {
          this.loadData()
          this.$message.success('编辑成功')
        }
      }
      this.visible = false;
    },
    async edit(key) {
      this.isEdit = true
      const {data} = await this.$http[0].get(`/rest/book/${key}`)
      this.model = data
      console.log(this.model)
      this.visible = true
    },
  }
}
</script>

<style scoped>

</style>