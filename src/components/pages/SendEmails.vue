<template>
  <div class="send-emails">
    <el-button class="successBtn" type="success" @click.native.prevent="handleSendEmail()">发送邮件</el-button>
    <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="phone" label="电话">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="theme" label="会议主题">
      </el-table-column>
      <el-table-column prop="date" label="报名时间">
      </el-table-column>
      <el-table-column prop="send" label="是否发送邀请函">
      </el-table-column>
      <el-table-column prop="sent" label="邀请函是否已发送">
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="20">
    </el-pagination>
    <el-dialog title="邀请函" :visible.sync="tableDialog" width="30%">
      <el-form :model="tableForm">
        <el-form-item label="标题" :label-width="tableFormLabelWidth">
          <el-input v-model="tableForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="正文尊称" :label-width="tableFormLabelWidth">
          <el-input v-model="tableForm.appellation" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="正文内容" :label-width="tableFormLabelWidth">
          <el-input v-model="tableForm.content" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="落款" :label-width="tableFormLabelWidth">
          <el-input v-model="tableForm.addresser" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tableDialog = false">取 消</el-button>
        <el-button type="primary" @click="tableDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tableData: [
        {
          name: "王小二",
          phone: "13788888888",
          email: "888888@qq.com",
          theme: "会议",
          date: "2016-07-08",
          send: "否",
          sent: "否"
        },
        {
          name: "王小二",
          phone: "13788888888",
          email: "888888@qq.com",
          theme: "会议",
          date: "2016-07-08",
          send: "否",
          sent: "否"
        },
        {
          name: "王小二",
          phone: "13788888888",
          email: "888888@qq.com",
          theme: "会议",
          date: "2016-07-08",
          send: "否",
          sent: "否"
        },
        {
          name: "王小二",
          phone: "13788888888",
          email: "888888@qq.com",
          theme: "会议",
          date: "2016-07-08",
          send: "否",
          sent: "否"
        },
        {
          name: "王小二",
          phone: "13788888888",
          email: "888888@qq.com",
          theme: "会议",
          date: "2016-07-08",
          send: "否",
          sent: "否"
        }
      ],
      multipleSelection: [],
      tableDialog: false,
      tableForm: {
        title: "",
        appellation: "",
        content: "",
        addresser: ""
      },
      tableFormLabelWidth: "100px"
    };
  },
  methods: {
    handleSendEmail(){
      var _this = this;
      _this.tableDialog = true;
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>