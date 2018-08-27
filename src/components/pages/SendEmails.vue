<template>
  <div class="send-emails">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="会议主题">
        <el-select v-model="formInline.meetingTitle" @change="meetingChange">
          <el-option v-for="item in meetings" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否已发送邮件">
        <el-select v-model="formInline.userInvited" @change="emailChange">
          <el-option label="全部" value=""></el-option>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="search()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click.native.prevent="handleSendEmail()">发送邮件</el-button>
      </el-form-item>
      <el-form-item>
        <a id="buttonDownload" href="" download @click="downExcel($event)">下载表格</a>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" ref="multipleSelection" @selection-change="handleSelectionChange" height='619'>
      <el-table-column type="selection" width="40">
      </el-table-column>
      <el-table-column prop="userName" label="姓名">
      </el-table-column>
      <el-table-column prop="userPhone" label="电话">
      </el-table-column>
      <el-table-column prop="userEmail" label="邮箱">
      </el-table-column>
      <el-table-column prop="meetingTitle" label="会议主题">
      </el-table-column>
      <el-table-column prop="userCompany" label="公司">
      </el-table-column>
      <el-table-column prop="userJob" label="职务">
      </el-table-column>
      <el-table-column prop="rangeName" label="用户类型">
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
        <el-form-item label="邮件主题" :label-width="tableFormLabelWidth" prop="invitationTitle">
          <el-input v-model="tableForm.invitationTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="正文尊称" :label-width="tableFormLabelWidth" prop="invitationName">
          <el-input v-model="tableForm.invitationName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议主题" :label-width="tableFormLabelWidth" prop="invitationContent">
          <el-input type="textarea" v-model="tableForm.invitationContent"></el-input>
        </el-form-item>
        <el-form-item label="发件人" :label-width="tableFormLabelWidth" prop="invitationChargerName">
          <el-input v-model="tableForm.invitationChargerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议议程" :label-width="tableFormLabelWidth" prop="invitationImg">
          <el-upload ref="upload" action="" :file-list="fileList" :auto-upload="false" :before-upload="beforeUpload" :limit="1" :on-change="onChange">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tableDialog = false">取 消</el-button>
        <el-button type="primary" @click="sendEmail()" :disabled="isShow">确 定</el-button>
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
        sendEmailUrl: this.GLOBAL.url + "send",
        getMeetingUrl: this.GLOBAL.url + "getAllMeetingTitle",
        downExcelUrl: this.GLOBAL.url + "exportExcel"
      },
      tableData: [],
      multipleSelection: [],
      tableDialog: false,
      tableForm: {
        invitationTitle: "博智宏观论坛",
        invitationName: "尊敬的",
        invitationContent: "新时期如何扩大内需",
        invitationChargerName: "XXX",
        invitationImg: ""
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
      currentPage: 1,
      // 搜索表单
      formInline: {
        meetingTitle: "全部",
        userInvited: "全部"
      },
      meetings: [],
      meetingsId: "",
      userInvited: "",
      fileList: [],
      isShow: false
    };
  },
  methods: {
    // 上传文件
    sendEmail() {
      var self = this;
      self.$refs.upload.submit();
    },
    beforeUpload(file, fileList) {
      var self = this;
      let fd = new FormData();
      let operateData = JSON.parse(JSON.stringify(self.tableForm));
      operateData.userId = [];
      self.multipleSelection.forEach(function(v) {
        operateData.userId.push(v.userId);
      });
      operateData.userId = operateData.userId.join(",");
      fd.append("files", file);
      fd.append("invitationTitle", operateData.invitationTitle);
      fd.append("invitationName", operateData.invitationName);
      fd.append("invitationContent", operateData.invitationContent);
      fd.append("invitationChargerName", operateData.invitationChargerName);
      fd.append("userId", operateData.userId);
      self.$axios.post(self.url.sendEmailUrl, fd).then(res => {
        if (res.data.status == "200") {
          self.getTableData({
            url: self.url.tableUrl,
            currentPage: self.currentPage,
            pageSize: self.pageSize,
            meetingsId: self.meetingsId,
            userInvited: self.userInvited
          });
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
      });
      return true;
    },
    onChange(file, fileList) {
      var self = this;
      self.isShow = false;
      self.fileList = fileList;
    },
    // form表单
    meetingChange(val) {
      var self = this;
      self.meetingsId = val;
    },
    emailChange(val) {
      var self = this;
      self.userInvited = val;
    },
    search() {
      var self = this;
      self.getTableData({
        url: self.url.tableUrl,
        currentPage: self.currentPage,
        pageSize: self.pageSize,
        meetingsId: self.meetingsId,
        userInvited: self.userInvited
      });
    },
    handleSendEmail() {
      var self = this;
      if (self.multipleSelection.length == 0) {
        alert("请选择用户！");
      } else {
        self.tableDialog = true;
        self.isShow = true;
      }
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
        pageSize: self.pageSize,
        meetingsId: self.meetingsId,
        userInvited: self.userInvited
      });
    },
    getTableData(param) {
      var self = this;
      if (param.meetingsId == "") {
        param.meetingsId = null;
      }
      if (param.userInvited == "") {
        param.userInvited = null;
      }
      self.$axios
        .post(
          param.url,
          qs.stringify({
            pageNum: param.currentPage,
            pageSize: param.pageSize,
            meetingId: param.meetingsId,
            userInvited: param.userInvited
          })
        )
        .then(function(res) {
          if (res.data.status == "200") {
            self.tableData = res.data.body;
            self.total = res.data.total;
          } else if (res.data.status == "100") {
            self.tableData = [];
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getMeetingData(param) {
      var self = this;
      self.$axios
        .get(param.url)
        .then(function(res) {
          if (res.data.status == "200") {
            self.meetings = res.data.body;
          } else if (res.data.resultCode == "500") {
            alert("暂时没有数据！");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    downExcel: function(event) {
      var self = this;
      var downloadBtn = document.querySelector("#buttonDownload");
      if (self.meetingsId == "" && self.userInvited != "") {
        downloadBtn.href =
          self.url.downExcelUrl + "?meetingId=&userInvited=" + self.userInvited;
      } else if (self.userInvited == "" && self.meetingsId != "") {
        downloadBtn.href =
          self.url.downExcelUrl +
          "?meetingId=" +
          self.meetingsId +
          "&userInvited=";
      } else if (self.userInvited == "" && self.meetingsId == "") {
        downloadBtn.href = self.url.downExcelUrl + "?meetingId=&userInvited=";
      } else {
        downloadBtn.href =
          self.url.downExcelUrl +
          "?meetingId=" +
          self.meetingsId +
          "&userInvited=" +
          self.userInvited;
      }
    }
  },
  mounted() {
    var self = this;
    if (localStorage.username == undefined) {
      self.$router.push("/login");
    }
    self.getMeetingData({
      url: self.url.getMeetingUrl
    });
    self.getTableData({
      url: self.url.tableUrl,
      currentPage: self.currentPage,
      pageSize: self.pageSize,
      meetingsId: self.meetingsId,
      userInvited: self.userInvited
    });
  }
};
</script>
<style scoped>
#buttonDownload {
  color: #fff;
  display: inline-block;
  background-color: #409eff;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
</style>