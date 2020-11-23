<template>
  <a-card>
    <a-button type="primary" @click="showModal">
      添加借书证
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

    <a-modal v-model="visible" title="添加借书证" @ok="handleOk" ok-text="确认" cancel-text="取消">
      <a-form :label-col=labelCol :wrapper-col="wrapperCol">
        <a-form-item label="姓名">
          <a-input placeholder="请输入读者姓名"
                   v-model="model.rdName">
          </a-input>
        </a-form-item>
        <a-form-item label="性别">
          <a-select default-value="男" style="width:100%"
                    v-model="model.rdSex"
                    placeholder="请选择读者性别">
            <a-select-option value="男">
              男
            </a-select-option>
            <a-select-option value="女">
              女
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="类别">
          <a-select :default-value="model.rdType" style="width:100%"
                    v-model="model.rdType"
                    placeholder="请选择读者类别">
            <a-select-option :value="item.rdType" v-for="item in rdTypeList">
              {{ item.rdType }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="单位">
          <a-input placeholder="请输入读者单位" v-model="model.rdDept">
          </a-input>
        </a-form-item>

        <a-form-item label="手机号">
          <a-input placeholder="请输入读者手机号"
                   v-model="model.rdPhone">
          </a-input>
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input placeholder="请输入读者邮箱" v-model="model.rdEmail">
          </a-input>
        </a-form-item>

        <a-form-item label="办证日期">
          <a-date-picker placeholder="请选择读者办证日期"
                         style="width: 100%"
                         v-model="model.rdDateReg"
                         @change="setDate">
          </a-date-picker>
        </a-form-item>

        <a-form-item label="照片">
          <a-upload
              name="file"
              list-type="picture-card"
              class="avatar-uploader"
              :headers="{Authorization:'Bearer ' + token}"
              :show-upload-list="false"
              :action="$http[0].defaults.baseURL+'/upload'"
              @change="uploadPic">
            <img v-if="model.rdPhoto" :src="model.rdPhoto" alt="avatar" style="width: 100%"/>
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="证件状态">
          <a-select :default-value="model.rdStatus?model.rdStatus:'正常'" style="width:100%"
                    v-model="model.rdStatus"
                    placeholder="请选择读者证件状态">
            <a-select-option :value="item" v-for="item in status">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="密码">
          <a-input placeholder="请输入读者密码" type="password" v-model="model.rdPwd">
          </a-input>
        </a-form-item>
        <a-form-item label="角色类型">
          <a-select :default-value="model.rdAdminRoles?model.rdAdminRoles:'读者'" style="width:100%"
                    v-model="model.rdAdminRoles"
                    placeholder="请选择角色类型">
            <a-select-option :value="item" v-for="item in rdAdminType">
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
      cateList: [],
      columns: [
        {
          title: '姓名',
          dataIndex: 'rdName',
        },
        {
          title: '类别',
          dataIndex: 'rdType',
        },
        {
          title: '单位',
          dataIndex: 'rdDept',
        },
        {
          title: '角色类型',
          dataIndex: 'rdAdminRoles',
        },
        {
          title: '证件状态',
          dataIndex: 'rdStatus',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: {customRender: 'operation'},
          width: '200px',
        },
      ],
      token: localStorage.getItem("token"),
      status: ["挂失", '注销', '正常', '过期'],
      rdAdminType: ['读者', '借书证管理员', '图书管理员', '借阅管理员', '系统管理员'],
      rdTypeList: [],
      spinning: true,
      visible: false,
      loading: false,
      isEdit: false,
    }
  },
  created() {
    this.loadData()
    this.fetchRdTypeList()
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
        this.$set(this.model, 'rdPhoto', info.file.response.url)
      }
    },
    async fetchRdTypeList() {
      let data = await this.$http[0].get('/rest/readerType')
      this.rdTypeList = data.data
    },
    setDate(date, dateString) {
      this.model.rdDateReg = dateString
    },
    async onDelete(key) {
      const data = await this.$http[0].delete(`/rest/readerInfo/${key}`)
      if (data.status === 200) {
        this.loadData()
        this.$message.success('删除成功')
      }
    },
    async loadData() {
      this.dataSource = []
      let data = await this.$http[0].get('/rest/readerInfo')
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
        const data = await this.$http[0].post('/rest/readerInfo', this.model)
        console.log(data)
        if (data.status === 200) {
          this.loadData()
          this.$message.success('添加成功')
        }
      } else {
        const data = await this.$http[0].put(`/rest/readerInfo/${this.model._id}`, this.model)
        if (data.status === 200) {
          this.loadData()
          this.$message.success('编辑成功')
        }
      }
      this.visible = false;
    },
    async edit(key) {
      this.isEdit = true
      const {data} = await this.$http[0].get(`/rest/readerInfo/${key}`)
      this.model = data
      console.log(this.model)
      this.visible = true
    },
  }
}
</script>

<style scoped>

</style>