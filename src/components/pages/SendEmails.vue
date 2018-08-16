<template>
  <div class="send-emails">
    <el-button class="successBtn" type="success" @click.native.prevent="handleSendEmail()">发送邮件</el-button>
    <el-table :data="tableData" border style="width: 100%" ref="multipleSelection" @selection-change="handleSelectionChange" height='619'>
      <el-table-column type="selection" width="40">
        <!-- <template slot-scope="scope">
          <el-checkbox v-if="scope.row.userInvited === 0 || scope.row.userInvited == '否'"></el-checkbox>
          <el-checkbox disabled v-else-if="scope.row.userInvited === 1 || scope.row.userInvited == '是'"></el-checkbox>
          <el-checkbox v-else></el-checkbox>
        </template> -->
      </el-table-column>
      <el-table-column prop="userName" label="姓名">
      </el-table-column>
      <el-table-column prop="userPhone" label="电话">
      </el-table-column>
      <el-table-column prop="userEmail" label="邮箱">
      </el-table-column>
      <el-table-column prop="meetingTitle" label="会议主题">
      </el-table-column>
      <el-table-column prop="userEnrollTime" label="报名时间">
      </el-table-column>
      <el-table-column prop="userInvited" label="邀请函是否已发送">
        <template slot-scope="scope">
          <span v-if="scope.row.userInvited === 0 || scope.row.userInvited == '否'">否</span>
          <span v-else-if="scope.row.userInvited === 1 || scope.row.userInvited == '是'">是</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="currentPage" @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog title="邀请函" :visible.sync="tableDialog" width="30%">
      <el-form :model="tableForm" :rules="tableRules" ref="dialogForm">
        <el-form-item label="标题" :label-width="tableFormLabelWidth" prop="invitationTitle">
          <el-input v-model="tableForm.invitationTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="正文尊称" :label-width="tableFormLabelWidth" prop="invitationName">
          <el-input v-model="tableForm.invitationName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="正文内容" :label-width="tableFormLabelWidth" prop="invitationContent">
          <el-input type="textarea" v-model="tableForm.invitationContent"></el-input>
        </el-form-item>
        <el-form-item label="落款" :label-width="tableFormLabelWidth" prop="invitationChargerName">
          <el-input v-model="tableForm.invitationChargerName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tableDialog = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data: function() {
    return {
      url: {
        tableUrl: this.GLOBAL.url + "getUserInfo",
        sendEmailUrl: this.GLOBAL.url + "send"
      },
      tableData: [],
      multipleSelection: [],
      tableDialog: false,
      tableForm: {
        invitationTitle: "",
        invitationName: "",
        invitationContent: "",
        invitationChargerName: ""
      },
      tableRules: {
        invitationTitle: [
          { required: true, message: "请输入会议主题", trigger: "blur" }
        ],
        invitationName: [
          { required: true, message: "请输入正文尊称", trigger: "blur" }
        ],
        invitationContent: [
          { required: true, message: "请输入会议内容", trigger: "blur" }
        ],
        invitationChargerName: [
          { required: true, message: "请输入发件人", trigger: "blur" }
        ]
      },
      tableFormLabelWidth: "100px",
      pageSize: 10,
      total: 10,
      currentPage: 1
    };
  },
  methods: {
    handleSendEmail() {
      var _this = this;
      _this.tableDialog = true;
    },
    handleSelectionChange(val) {
      var self = this;
      self.multipleSelection = val;
    },
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.getTableData({
        url: self.url.tableUrl,
        currentPage: self.currentPage,
        pageSize: self.pageSize
      });
    },
    getTableData(param) {
      var self = this;
      self.$axios
        .post(
          param.url,
          qs.stringify({
            pageNum: param.currentPage,
            pageSize: param.pageSize
          })
        )
        .then(function(res) {
          if (res.data.status == "200") {
            self.tableData = res.data.body;
            self.total = res.data.total;
          } else if (res.data.resultCode == "500") {
            alert("暂时没有数据！");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    submit() {
      var self = this;
      self.$refs.dialogForm.validate(valid => {
        if (valid) {
          let operateData = JSON.parse(JSON.stringify(self.tableForm));
          operateData.userId = [];
          self.multipleSelection.forEach(function(v) {
            operateData.userId.push(v.userId);
          });
          operateData.userId = operateData.userId.join(",");
          self.$axios
            .post(self.url.sendEmailUrl, qs.stringify(operateData))
            .then(res => {
              if (res.data.status == "200") {
                self.tableData = res.data.body;
                self.tableDialog = false;
                self.$message({
                  message: "发送成功",
                  type: "success"
                });
              } else if (res.data.status == "500") {
                self.tableDialog = false;
                self.$message({
                  message: "发送失败",
                  type: "danger"
                });
              }
            })
            .catch(err => {
              console.log(err);
              console.log("发送出错了。。。");
            });
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    var self = this;
    if (localStorage.username == undefined) {
      self.$router.push("/login");
    }
    self.getTableData({
      url: self.url.tableUrl,
      currentPage: self.currentPage,
      pageSize: self.pageSize
    });
  }
};
</script>
<style scoped>
</style>