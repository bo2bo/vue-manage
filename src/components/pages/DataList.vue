<template>
  <div class="data-list">
    <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" style="display:none">
      </el-table-column>
      <el-table-column prop="meeting_date" label="日期">
      </el-table-column>
      <el-table-column prop="meeting_title" label="主题">
      </el-table-column>
      <el-table-column prop="meeting_content" label="内容">
      </el-table-column>
      <el-table-column prop="meeting_location" label="地点">
      </el-table-column>
      <el-table-column prop="meeting_status" label="状态">
      </el-table-column>
      <el-table-column prop="meeting_enroll" label="是否开放报名">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button @click.native.prevent="handleDelete(scope.$index, tableData)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑会议" :visible.sync="tableDialog" width="30%">
      <el-form :model="tableForm">
        <el-form-item label="会议日期" :label-width="tableFormLabelWidth">
          <el-input v-model="tableForm.meeting_date" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议主题" :label-width="tableFormLabelWidth">
          <el-input v-model="tableForm.meeting_title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议内容" :label-width="tableFormLabelWidth">
          <el-input v-model="tableForm.meeting_content" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议地点" :label-width="tableFormLabelWidth">
          <el-input v-model="tableForm.meeting_location" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议状态" :label-width="tableFormLabelWidth">
          <el-select v-model="tableForm.meeting_status" placeholder="请选择会议状态">
            <el-option label="未开始" value="0"></el-option>
            <el-option label="已开始" value="1"></el-option>
            <el-option label="已截止" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否开放报名" :label-width="tableFormLabelWidth">
          <el-select v-model="tableForm.meeting_enroll" placeholder="是否开放报名">
            <el-option label="开放" value="open"></el-option>
            <el-option label="否" value="close"></el-option>
          </el-select>
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
          meeting_date: "2016-05-02",
          meeting_title: "hhhhhh",
          meeting_content: "jjjjjjj",
          meeting_location: "444444",
          meeting_status: "未开始",
          meeting_enroll: "开放"
        },
        {
          meeting_date: "2016-05-02",
          meeting_title: "hhhhhh",
          meeting_content: "jjjjjjj",
          meeting_location: "444444",
          meeting_status: "未开始",
          meeting_enroll: "否"
        },
        {
          meeting_date: "2016-05-02",
          meeting_title: "hhhhhh",
          meeting_content: "jjjjjjj",
          meeting_location: "444444",
          meeting_status: "未开始",
          meeting_enroll: "否"
        },
        {
          meeting_date: "2016-05-02",
          meeting_title: "hhhhhh",
          meeting_content: "jjjjjjj",
          meeting_location: "444444",
          meeting_status: "未开始",
          meeting_enroll: "否"
        }
      ],
      multipleSelection: [],
      tableDialog: false,
      tableForm: {
        meeting_date: "",
        meeting_title: "",
        meeting_content: "",
        meeting_location: "",
        meeting_status: "未开始",
        meeting_enroll: "否"
      },
      tableFormLabelWidth: "120px"
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      var _this = this;
      _this.tableForm = row;
      _this.tableDialog = true;
    },
    handleDelete(index, rows) {
      this.$confirm("此操作将永久删除该会议, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          rows.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    var self = this;
    if (localStorage.username == undefined) {
      self.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.data-list .el-select {
  width: 100%;
}
</style>