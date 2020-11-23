<template>
  <a-card>
    <a-button type="primary" @click="showModal">
      借书
    </a-button>

    <a-input-search placeholder="输入借书证号查询所有信息" style="width: 300px;margin-left: 30px" @search="searchRd"/>

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
          <a-button style="margin-left: 10px" @click="edit(record._id)">详情</a-button>
          <a-popconfirm
              v-if="dataSource.length"
              title="确认续借吗"
              @confirm="() => reLendBook(record)">
            <a-button style="margin-left: 10px">续借</a-button>
          </a-popconfirm>
          <a-popconfirm
              v-if="dataSource.length"
              title="确认还书吗"
              @confirm="() => returnBook(record)">
            <a-button style="margin-left: 10px">还书</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-spin>

    <a-modal v-model="visible" title="借书" @ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="visible = false && !isEdit">
          取消
        </a-button>
        <a-button key="submit" type="primary" @click="handleOk" :disabled="!isCanLend">
          确认
        </a-button>
      </template>
      <a-form :label-col=labelCol :wrapper-col="wrapperCol">
        <template v-if="!isEdit">
          <a-form-item label="借书证搜索">
            <a-input-search placeholder="输入借书证号" @search="searchRd"/>
          </a-form-item>
          <a-form-item label="读者相关信息" v-if="rdInfo.show">
            <div>
              读者状态:{{ rdInfo.status }}
            </div>
            <div>
              已借书籍数量:{{ rdInfo.lendCount }}
            </div>
            <div>
              可借书籍数量:{{ rdInfo.canLendCount }}
            </div>
          </a-form-item>
          <a-form-item label="待借图书搜索">
            <a-input-search placeholder="输入待借图书书号" @search="searchBook"/>
          </a-form-item>
          <a-form-item label="图书相关信息" v-if="bkInfo.show">
            <div>
              书籍状态:{{ bkInfo.status }}
            </div>
          </a-form-item>
        </template>

        <template v-if="isCanLend || isEdit">
          <a-form-item label="读者序号">
            <a-input placeholder="请输入读者序号"
                     disabled
                     v-model="model.rdID">
            </a-input>
          </a-form-item>

          <a-form-item label="图书序号">
            <a-input placeholder="请输入图书序号"
                     disabled
                     v-model="model.bkID">
            </a-input>
          </a-form-item>

          <a-form-item label="续借次数">
            <a-input placeholder="请输入续借次数"
                     v-model="model.ldContinueTimes">
            </a-input>
          </a-form-item>

          <a-form-item label="借书日期">
            <a-date-picker placeholder="请选择借书日期"
                           style="width: 100%"
                           v-model="model.ldDateOut"
                           @change="setDate">
            </a-date-picker>
          </a-form-item>

          <a-form-item label="应还日期">
            <a-date-picker placeholder="请选择应还日期"
                           style="width: 100%"
                           disabled
                           v-model="model.ldDateRetPlan">
            </a-date-picker>
          </a-form-item>

          <a-form-item label="实际还书日期">
            <a-date-picker placeholder="请选择实际还书日期"
                           style="width: 100%"
                           disabled
                           v-model="model.ldDateRetAct">
            </a-date-picker>
          </a-form-item>

          <a-form-item label="超期天数">
            <a-input placeholder="请输入超期天数"
                     disabled
                     v-model="model.ldOverDay">
            </a-input>
          </a-form-item>

          <a-form-item label="超期金额">
            <a-input placeholder="请输入超期金额（应罚款金额）"
                     disabled
                     v-model="model.ldOverMoney">
            </a-input>
          </a-form-item>

          <a-form-item label="罚款金额">
            <a-input placeholder="请输入罚款金额"
                     disabled
                     v-model="model.ldPunishMoney">
            </a-input>
          </a-form-item>

          <a-form-item label="是否已经还书">
            <a-switch default-checked v-model="model.lsHasReturn"/>
          </a-form-item>

          <a-form-item label="借书操作员">
            <a-input placeholder="请输入借书操作员"
                     v-model="model.OperatorLend">
            </a-input>
          </a-form-item>

          <a-form-item label="还书操作员">
            <a-input placeholder="请输入还书操作员"
                     v-model="model.OperatorRet">
            </a-input>
          </a-form-item>
        </template>

      </a-form>
    </a-modal>
  </a-card>


</template>

<script>


export default {
  name: "borrowManagement",
  data() {
    return {
      model: {
        rdID: '',
        bkID: '',
        ldContinueTimes: 0,
        ldDateOut: '',
        ldDateRetPlan: '',
        ldDateRetAct: '',
        ldOverDay: 0,
        ldOverMoney: 0,
        ldPunishMoney: 0,
        lsHasReturn: false,
      },
      labelCol: {span: 7},
      wrapperCol: {span: 14},
      dataSource: [],
      columns: [
        {
          title: '读者序号',
          dataIndex: 'rdID',
        },
        {
          title: '图书序号',
          dataIndex: 'bkID',
        },
        {
          title: '续借次数',
          dataIndex: 'ldContinueTimes',
        },
        {
          title: '借书日期',
          dataIndex: 'ldDateOut',
        },
        {
          title: '是否已经还书',
          dataIndex: 'lsHasReturn',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: {customRender: 'operation'},
          width: '400px',
        },
      ],
      rdInfo: {
        show: false,
        status: '',
        lendCount: 0,
        canLendCount: 0,
        canLendDay: 0,
      },
      bkInfo: {
        show: false,
        status: ''
      },
      spinning: true,
      visible: false,
      isEdit: false,

    }
  },
  computed: {
    isCanLend() {
      console.log(this.rdInfo.status === "正常" && this.rdInfo.lendCount < this.rdInfo.canLendCount && this.bkInfo.status === '在馆')
      return this.rdInfo.status === "正常" && this.rdInfo.lendCount < this.rdInfo.canLendCount && this.bkInfo.status === '在馆'
    }
  },
  created() {
    console.log(this.$moment("add", "7 days"))
    this.loadData()
  },
  methods: {
    //借书日期
    setDate(date, dateString) {
      console.log(date)
      this.model.ldDateOut = dateString
      this.model.ldDateRetPlan = this.$moment(dateString).add(this.rdInfo.canLendDay, 'days').format('YYYY-MM-DD ')
      console.log(this.model.ldDateRetPlan)
    },
    //搜索学生
    async searchRd(value) {
      const data = await this.$http[0].get(`/search/readerInfo/${value}`)
      if (data.status === 200) {
        this.rdInfo.status = data.data.rdStatus
        this.rdInfo.lendCount = data.data.rdLendCount
        let canlendData = await this.$http[0].get(`search/readerType/${data.data.rdType}`)
        this.rdInfo.canLendCount = canlendData.data.canLendQty
        this.rdInfo.canLendDay = canlendData.data.canLendDay
        this.model.rdID = value
        this.rdInfo.show = true
      }
    },
    //搜索图书
    async searchBook(value) {
      const data = await this.$http[0].get(`/search/book/${value}`)
      if (data.status === 200) {
        this.bkInfo.status = data.data.bkStatus
        this.model.bkID = value
        this.bkInfo.show = true
      }
    },

    //还书
    async returnBook(record) {
      console.log(record)
      if (record.lsHasReturn === '未还') {
        record.lsHasReturn = true
        record.ldDateRetAct = this.$moment().format('YYYY-MM-DD')
        const data = await this.$http[0].post('/returnBook', record)
        if (data.status === 200) {
          this.loadData()
          this.$message.success('还书成功')
        }
      } else {
        this.$message.warning('此书已还')
      }

    },

    //续借
    async reLendBook(record) {
      console.log(record)
      //读者信息
      const data = await this.$http[0].get(`/search/readerInfo/${record.rdID}`)
      if (data.status === 200) {
        //查看读者类型信息
        let canlendData = await this.$http[0].get(`search/readerType/${data.data.rdType}`)
        //可续借天数
        let canlendDay = canlendData.data.canLendDay
        //可续借次数
        let relendNum = canlendData.data.relendNum

        if (record.lsHasReturn === '未还') {
          if (record.ldContinueTimes === relendNum) {
            this.$message.warning("已超过最大续借次数")
          } else {
            //续借
            record.ldContinueTimes++
            record.ldDateRetPlan = this.$moment(record.ldDateRetPlan).add(canlendDay, 'days').format('YYYY-MM-DD ')
            record.lsHasReturn = false
            console.log(record)
            const data = await this.$http[0].post('/reLendBook', record)
            if (data.status === 200) {
              this.loadData()
              this.$message.success('续借成功')
            }
          }
        } else {
          this.$message.warning("此书已还")
        }


        console.log(canlendDay)
        console.log(relendNum)
      }
    },

    async onDelete(key) {
      const data = await this.$http[0].delete(`/rest/borrowInfo/${key}`)
      if (data.status === 200) {
        this.loadData()
        this.$message.success('删除成功')
      }
    },

    async loadData() {
      this.dataSource = []
      let data = await this.$http[0].get('/rest/borrowInfo')
      this.dataSource = [...data.data]
      this.dataSource.forEach(item => {
        console.log(item.lsHasReturn)
        item.lsHasReturn ? item.lsHasReturn = '已还' : item.lsHasReturn = '未还'
        item.ldDateOut = this.$moment(item.ldDateOut).format('YYYY-MM-DD')
      })
      this.spinning = false
      console.log(this.dataSource)
    },
    showModal() {
      this.isEdit = false
      this.model = {
        rdID: '',
        bkID: '',
        ldContinueTimes: 0,
        ldDateOut: '',
        ldDateRetPlan: '',
        ldDateRetAct: '',
        ldOverDay: 0,
        ldOverMoney: 0,
        ldPunishMoney: 0,
        lsHasReturn: false,
      }
      this.visible = true
    },
    async handleOk(e) {
      const data = await this.$http[0].post('/borrowBook', this.model)
      if (data.status === 200) {
        this.loadData()
        this.$message.success('借书成功')
      }
      this.visible = false;
    },
    async edit(key) {
      this.isEdit = true
      const {data} = await this.$http[0].get(`/rest/borrowInfo/${key}`)
      this.model = data
      this.visible = true
    },
  }
}
</script>

<style scoped>

</style>