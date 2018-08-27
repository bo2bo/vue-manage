<template>
  <div class="meeting-list">
    <el-button class="successBtn" type="success" @click.native.prevent="handleAdd()">新增会议</el-button>
    <el-table :data="tableData" border style="width: 100%" height='619'>
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
          <span v-if="scope.row.meetingMeetingStatus === 0 || scope.row.meetingMeetingStatus == '未开始'">未开始</span>
          <span v-else-if="scope.row.meetingMeetingStatus === 1 || scope.row.meetingMeetingStatus == '已开始'">已开始</span>
          <span v-else-if="scope.row.meetingMeetingStatus === 2 || scope.row.meetingMeetingStatus == '已截止'">已截止</span>
        </template>
      </el-table-column>
      <el-table-column prop="meetingStatus" label="是否开放报名">
        <template slot-scope="scope">
          <span v-if="scope.row.meetingStatus === 0 || scope.row.meetingStatus == '否'">否</span>
          <span v-else-if="scope.row.meetingStatus === 1 || scope.row.meetingStatus == '开放'">开放</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click.native.prevent="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button @click.native.prevent="handleDelete(scope.$index, tableData)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="currentPage" @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog v-bind:title="tableDialogTitle" :visible.sync="tableDialog" width="30%">
      <el-form ref="dialogForm" :model="tableDialogForm" :rules="tableDialogRules">
        <el-form-item label="会议日期" :label-width="tableDialogFormLabelWidth" prop="meetingDate">
          <el-date-picker v-model="tableDialogForm.meetingDate" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="会议主题" :label-width="tableDialogFormLabelWidth" prop="meetingTitle">
          <el-input v-model="tableDialogForm.meetingTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议内容" :label-width="tableDialogFormLabelWidth" prop="meetingContent">
          <el-input type="textarea" v-model="tableDialogForm.meetingContent" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议地点" :label-width="tableDialogFormLabelWidth" prop="meetingLocation">
          <el-input type="textarea" v-model="tableDialogForm.meetingLocation" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议状态" :label-width="tableDialogFormLabelWidth" prop="meetingMeetingStatus">
          <el-select v-model="tableDialogForm.meetingMeetingStatus" placeholder="请选择会议状态">
            <el-option label="未开始" value="未开始"></el-option>
            <el-option label="已开始" value="已开始"></el-option>
            <el-option label="已截止" value="已截止"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否开放报名" :label-width="tableDialogFormLabelWidth" prop="meetingStatus">
          <el-select v-model="tableDialogForm.meetingStatus" placeholder="是否开放报名">
            <el-option label="开放" value="开放"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议议程" :label-width="tableDialogFormLabelWidth" prop="invitationImg">
          <el-upload ref="upload" action="" :file-list="fileList" :auto-upload="false" :limit="1" :on-exceed="onExceeds" :before-remove="beforeRemove" :on-change="onChange">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tableDialog = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="submitUpload()" :disabled="isShow">确 定</el-button>
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
        tableUrl: this.GLOBAL.url + "getMeetings",
        addDataUrl: this.GLOBAL.url + "addMeeting",
        editDataUrl: this.GLOBAL.url + "updateMeeting",
        deleteDataUrl: this.GLOBAL.url + "deleteMeeting"
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
      tableDialogRules: {
        meetingDate: [
          { required: true, message: "请输入会议日期", trigger: "blur" }
        ],
        meetingTitle: [
          { required: true, message: "请输入会议主题", trigger: "blur" }
        ],
        meetingContent: [
          { required: true, message: "请输入会议内容", trigger: "blur" }
        ],
        meetingLocation: [
          { required: true, message: "请输入会议地址", trigger: "blur" }
        ],
        meetingMeetingStatus: [
          { required: true, message: "请选择会议状态", trigger: "blur" }
        ],
        meetingStatus: [
          { required: true, message: "请选择报名状态", trigger: "blur" }
        ]
      },
      tableDialogFormLabelWidth: "120px",
      isAdd: true,
      pageSize: 10,
      total: 10,
      currentPage: 1,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      meetingId: "",
      fileList: [],
      isShow: false
    };
  },
  methods: {
    submitUpload() {
      var self = this;
      let fd = new FormData();
      fd.append("files", self.fileList[0].raw);
      self.appendData({
        fd: fd
      });
    },
    onChange(file, fileList) {
      var self = this;
      self.isShow = false;
      self.fileList = fileList;
    },
    beforeRemove(file, fileList) {
      var self = this;
      self.isShow = true;
      alert("请上传新文件！");
    },
    appendData(param) {
      var self = this;
      let operateData = JSON.parse(JSON.stringify(self.tableDialogForm));
      if (operateData.meetingStatus == "否") {
        operateData.meetingStatus = 0;
        operateData.isFlag = false;
      } else {
        operateData.meetingStatus = 1;
        operateData.isFlag = true;
      }
      if (operateData.meetingMeetingStatus == "未开始") {
        operateData.meetingMeetingStatus = 0;
      } else if (operateData.meetingMeetingStatus == "已开始") {
        operateData.meetingMeetingStatus = 1;
      } else {
        operateData.meetingMeetingStatus = 2;
      }
      param.fd.append("isFlag", operateData.isFlag);
      param.fd.append("meetingContent", operateData.meetingContent);
      param.fd.append("meetingLocation", operateData.meetingLocation);
      param.fd.append("meetingMeetingStatus", operateData.meetingMeetingStatus);
      param.fd.append("meetingStatus", operateData.meetingStatus);
      param.fd.append("meetingTitle", operateData.meetingTitle);
      if (self.isAdd) {
        param.fd.append("meetingDate", operateData.meetingDate);
        self.$axios
          .post(self.url.addDataUrl, param.fd)
          .then(res => {
            if (res.data.status == "200") {
              self.getTableData({
                url: self.url.tableUrl,
                currentPage: self.currentPage,
                pageSize: self.pageSize
              });
              self.tableDialog = false;
              self.$message({
                message: "添加成功",
                type: "success"
              });
            } else if (res.data.status == "500") {
              self.tableDialog = false;
              self.$message({
                message: "添加会议失败",
                type: "danger"
              });
            }
          })
          .catch(err => {
            console.log(err);
            console.log("添加出错了。。。");
          });
      } else {
        operateData.meetingId = self.meetingId;
        operateData.meetingDate = operateData.meetingDate.split(",")[0];
        param.fd.append("meetingId", operateData.meetingId);
        param.fd.append("meetingDate", operateData.meetingDate);
        self.$axios
          .post(self.url.editDataUrl, param.fd)
          .then(response => {
            if (response.data.status == "200") {
              self.getTableData({
                url: self.url.tableUrl,
                currentPage: self.currentPage,
                pageSize: self.pageSize
              });
              self.tableDialog = false;
              self.$message({
                message: "修改成功",
                type: "success"
              });
            }
          })
          .catch(err => {
            console.log(err);
            console.log("修改出错了。。。");
          });
      }
    },
    onExceeds(files, fileList) {
      alert("只能上传一张图片，请删除后再上传！");
    },
    handleAdd() {
      var self = this;
      self.tableDialogTitle = "新增会议";
      self.tableDialogForm = {};
      self.tableDialog = true;
      self.isAdd = true;
      self.fileList = [];
      self.isShow = true;
    },
    handleEdit(index, row) {
      var self = this;
      self.tableDialogTitle = "编辑会议";
      self.tableDialogForm = row;
      self.fileList = [
        {
          name: row.meetingUrl.split("/")[row.meetingUrl.split("/").length - 1],
          url: row.meetingUrl
        }
      ];
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
      self.meetingId = row.meetingId;
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
          self.$axios
            .post(
              self.url.deleteDataUrl,
              qs.stringify({
                meetingId: rows[index].meetingId
              })
            )
            .then(response => {
              if (response.data.status == "200") {
                self.getTableData({
                  url: self.url.tableUrl,
                  currentPage: self.currentPage,
                  pageSize: self.pageSize
                });
              }
            })
            .catch(err => {
              console.log(err);
              console.log("删除出错了。。。");
            });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
.el-date-editor.el-input {
  width: 100% !important;
}
</style>