<template>
  <div class="meeting-list">
    <el-button class="successBtn" type="success" @click.native.prevent="handleAdd()">新增会议</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="meetingDate" label="日期">
      </el-table-column>
      <el-table-column prop="meetingTitle" label="主题">
      </el-table-column>
      <el-table-column prop="meetingContent" label="内容">
      </el-table-column>
      <el-table-column prop="meetingLocation" label="地点">
      </el-table-column>
      <el-table-column prop="meetingMeetingStatus" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.meetingMeetingStatus === 0">未开始</span>
          <span v-else-if="scope.row.meetingMeetingStatus === 1">已开始</span>
          <span v-else="scope.row.meetingMeetingStatus === 2">已截止</span>
        </template>
      </el-table-column>
      <el-table-column prop="meetingStatus" label="是否开放报名">
        <template slot-scope="scope">
          <span v-if="scope.row.meetingStatus === 0">否</span>
          <span v-else="scope.row.meetingStatus === 1">开放</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click.native.prevent="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button @click.native.prevent="handleDelete(scope.$index, tableData)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="20">
    </el-pagination>
    <el-dialog v-bind:title="tableDialogTitle" :visible.sync="tableDialog" width="30%" v-on:close="dialogClose">
      <el-form ref="dialogForm" :model="tableDialogForm">
        <el-form-item label="会议日期" :label-width="tableDialogFormLabelWidth">
          <el-date-picker v-model="tableDialogForm.meetingDate" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="会议主题" :label-width="tableDialogFormLabelWidth">
          <el-input v-model="tableDialogForm.meetingTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议内容" :label-width="tableDialogFormLabelWidth">
          <el-input v-model="tableDialogForm.meetingContent" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议地点" :label-width="tableDialogFormLabelWidth">
          <el-input v-model="tableDialogForm.meetingLocation" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议状态" :label-width="tableDialogFormLabelWidth">
          <el-select v-model="tableDialogForm.meetingMeetingStatus" placeholder="请选择会议状态">
            <el-option label="未开始" value="未开始"></el-option>
            <el-option label="已开始" value="已开始"></el-option>
            <el-option label="已截止" value="已截止"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否开放报名" :label-width="tableDialogFormLabelWidth">
          <el-select v-model="tableDialogForm.meetingStatus" placeholder="是否开放报名">
            <el-option label="开放" value="开放"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tableDialog = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="submitData()">确 定</el-button>
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
        tableUrl: "http://192.168.1.62:8080/getMeetings",
        addDataUrl: "http://192.168.1.62:8080/addMeeting",
        editDataUrl: "",
        deleteDataUrl: ""
      },
      tableData: [],
      tableDialog: false,
      tableDialogTitle: "编辑会议",
      tableDialogForm: {
        meetingDate: "",
        meetingTitle: "",
        meetingContent: "",
        meetingLocation: "",
        meetingMeetingStatus: "未开始",
        meetingStatus: "否"
      },
      tableDialogFormLabelWidth: "120px",
      isAdd: true
    };
  },
  methods: {
    handleAdd() {
      var self = this;
      self.tableDialogTitle = "新增会议";
      self.tableDialog = true;
      self.isAdd = true;
    },
    dialogClose() {
      var self = this;
      self.$refs.dialogForm.resetFields();
    },
    handleEdit(index, row) {
      var self = this;
      self.tableDialogTitle = "编辑会议";
      self.tableDialogForm = row;
      if (self.tableDialogForm.meetingStatus == 0) {
        self.tableDialogForm.meetingStatus = "否";
      } else {
        self.tableDialogForm.meetingStatus = "开放";
      }
      if (self.tableDialogForm.meetingMeetingStatus == 0) {
        self.tableDialogForm.meetingMeetingStatus = "未开始";
      } else if (self.tableDialogForm.meetingMeetingStatus == 1) {
        self.tableDialogForm.meetingMeetingStatus = "已开始";
      } else {
        self.tableDialogForm.meetingMeetingStatus = "已截止";
      }
      self.tableDialog = true;
      self.isAdd = false;
    },
    handleDelete(index, rows) {
      var self = this;
      self
        .$confirm("此操作将永久删除该会议, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          self.$message({
            type: "success",
            message: "删除成功!"
          });
          rows.splice(index, 1);
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    submitData() {
      var self = this;
      self.appendData();
      self.tableDialog = false;
    },
    getTableData() {
      var self = this;
      self.$axios
        .get(self.url.tableUrl)
        .then(function(res) {
          if (res.data.status == "200") {
            self.tableData = res.data.body;
            console.log(res.data.body);
          } else if (res.data.resultCode == "500") {
            alert("暂时没有数据！");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    appendData() {
      var self = this;
      self.$refs.dialogForm.validate(valid => {
        if (valid) {
          let operateData = JSON.parse(JSON.stringify(self.tableDialogForm));
          if (operateData.meetingStatus == "否") {
            operateData.meetingStatus = 0;
          } else {
            operateData.meetingStatus = 1;
          }
          if (operateData.meetingMeetingStatus == "未开始") {
            operateData.meetingMeetingStatus = 0;
          } else if (operateData.meetingMeetingStatus == "已开始") {
            operateData.meetingMeetingStatus = 1;
          } else {
            operateData.meetingMeetingStatus = 2;
          }
          if (self.isAdd) {
            self.$axios
              .post(self.url.addDataUrl, qs.stringify(operateData))
              .then(response => {
                debugger;
                self.tableDialog = false;
                self.$message({
                  message: "添加成功",
                  type: "success"
                });
              })
              .catch(err => {
                console.log(err);
                console.log("添加出错了。。。");
              });
          } else {
            self.$axios
              .post(
                self.url.updateUrl,
                qs.stringify({
                  topicName: operateData.topicName,
                  topicId: operateData.topicId
                })
              )
              .then(response => {
                debugger;
                self.tableDialog = false;
                self.$message({
                  message: "修改成功",
                  type: "success"
                });
              })
              .catch(err => {
                console.log(err);
                console.log("修改出错了。。。");
              });
          }
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
    self.getTableData();
  }
};
</script>
<style scoped>
.el-date-editor.el-input {
  width: 100% !important;
}
</style>
